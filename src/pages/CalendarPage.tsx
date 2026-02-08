import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { daysUntil } from '@/utils/formatDate';
import { Icon } from '@/components/ui/Icon';
import type { Event } from '@/types';

type CalendarView = 'today' | 'month' | 'week';

function getDaysInMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days: (number | null)[] = [];
  const startDay = first.getDay();
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let d = 1; d <= last.getDate(); d++) days.push(d);
  return days;
}

function toYMD(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

/** Format a Date to YYYY-MM-DD in local time (avoids UTC shift from toISOString). */
function dateToYMD(date: Date): string {
  return toYMD(date.getFullYear(), date.getMonth(), date.getDate());
}

/** True if dateStr (YYYY-MM-DD) has the same month (0–11) and day as the given cell. */
function sameMonthDay(dateStr: string, month0: number, day: number): boolean {
  const m = parseInt(dateStr.slice(5, 7), 10);
  const d = parseInt(dateStr.slice(8, 10), 10);
  return m === month0 + 1 && d === day;
}

const REPEATING_EVENT_TYPES: Event['type'][] = ['birthday', 'anniversary'];

function eventIcon(type: Event['type']): string {
  switch (type) {
    case 'birthday':
      return 'cake-fill';
    case 'anniversary':
      return 'gem';
    case 'name_day':
      return 'person';
    default:
      return 'calendar-event';
  }
}

function ordinal(n: number): string {
  const s = String(n);
  const last = s.slice(-1);
  const last2 = s.slice(-2);
  if (last2 === '11' || last2 === '12' || last2 === '13') return `${n}th`;
  if (last === '1') return `${n}st`;
  if (last === '2') return `${n}nd`;
  if (last === '3') return `${n}rd`;
  return `${n}th`;
}

function eventTitleWithYears(
  event: Event,
  displayDate: string,
  getPersonName: (id: string) => string
): string {
  const displayYear = parseInt(displayDate.slice(0, 4), 10);
  const eventYear = parseInt(event.date.slice(0, 4), 10);
  const years = displayYear - eventYear;
  const name = getPersonName(event.personId);
  if (event.type === 'birthday') {
    return `${name} – ${ordinal(years)} Birthday`;
  }
  if (event.type === 'anniversary') {
    return `${ordinal(years)} Anniversary`;
  }
  return event.title;
}

export function CalendarPage() {
  const { events, people } = useApp();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewMode, setViewMode] = useState<CalendarView>('month');

  const getPersonName = (personId: string) =>
    people.find((p) => p.id === personId)?.name ?? 'Unknown';

  const monthName = new Date(viewYear, viewMonth).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const days = useMemo(
    () => getDaysInMonth(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  const eventsByDate = useMemo(() => {
    const map = new Map<string, Event[]>();
    events.forEach((event) => {
      const list = map.get(event.date) ?? [];
      list.push(event);
      map.set(event.date, list);
    });
    return map;
  }, [events]);

  const upcomingEvents = useMemo(() => {
    const start = new Date(today);
    start.setHours(0, 0, 0, 0);
    const todayStr = dateToYMD(start);
    const thisYear = today.getFullYear();
    const withSortDate = events.map((e) => {
      if (REPEATING_EVENT_TYPES.includes(e.type)) {
        const [, m, d] = e.date.split('-').map(Number);
        const thisYearOccurrence = new Date(thisYear, m - 1, d);
        const nextOccurrence =
          thisYearOccurrence.getTime() >= start.getTime()
            ? thisYearOccurrence
            : new Date(thisYear + 1, m - 1, d);
        return { event: e, sortDate: dateToYMD(nextOccurrence) };
      }
      return { event: e, sortDate: e.date };
    });
    return withSortDate
      .filter(({ sortDate }) => sortDate >= todayStr)
      .sort((a, b) => a.sortDate.localeCompare(b.sortDate))
      .slice(0, 3)
      .map(({ event, sortDate }) => ({ event, displayDate: sortDate }));
  }, [events, today]);

  const handlePrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const goToToday = () => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setViewMode('month');
  };

  const todayYMD = toYMD(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return (
    <div className="flex w-full min-w-0 min-h-full lg:ml-[calc(-50vw+50%)] lg:mr-[calc(-50vw+50%)] lg:w-screen lg:pl-72">
      {/* Left sidebar: Quick Look fixed to viewport left */}
      <aside className="hidden lg:block fixed left-0 top-16 w-72 h-[calc(100vh-4rem)] overflow-y-auto border-r border-border bg-background-light z-10 pl-6 pr-4 pt-6">
        <section>
          <h3 className="text-foreground font-bold text-lg mb-1">Quick Look</h3>
          <p className="text-muted text-sm mb-4">Upcoming events</p>
          <div className="space-y-3">
            {upcomingEvents.length === 0 ? (
              <p className="text-muted text-sm">No upcoming events.</p>
            ) : (
              upcomingEvents.slice(0, 3).map(({ event, displayDate }) => {
                const inDays = daysUntil(displayDate);
                const daysLabel =
                  inDays === 0
                    ? 'TODAY'
                    : inDays === 1
                      ? 'TOMORROW'
                      : `IN ${inDays} DAYS`;
                const titleWithYears = eventTitleWithYears(
                  event,
                  displayDate,
                  getPersonName
                );
                const status = event.giftStatus ?? 'not_planned';
                const statusLabel =
                  status === 'not_planned'
                    ? 'Not planned'
                    : status === 'ideas_gathered'
                      ? 'Ideas Gathered'
                      : 'Purchased';
                const suggestionTitle = event.chosenSuggestionTitle ?? '';
                const purchasedGiftTitle = event.purchasedGiftTitle ?? '';
                return (
                  <div
                    key={event.id}
                    className="rounded-xl p-4 border border-border relative"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-muted text-xs font-semibold uppercase tracking-wider">
                        {daysLabel}
                      </span>
                      <span className="text-primary shrink-0 flex items-center">
                        <Icon
                          name={eventIcon(event.type)}
                          className="text-lg"
                        />
                      </span>
                    </div>
                    <p className="font-bold text-foreground text-sm mt-1">
                      {titleWithYears}
                    </p>
                    <p className="text-muted text-xs mt-2">
                      Status:{' '}
                      <span
                        className={
                          status === 'purchased'
                            ? 'text-green-600'
                            : status === 'ideas_gathered'
                              ? 'text-amber-600'
                              : 'text-muted'
                        }
                      >
                        {statusLabel}
                      </span>
                    </p>
                    {status === 'ideas_gathered' && (
                      <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/10 px-2 py-1.5">
                        <Icon
                          name="lightbulb-fill"
                          className="text-primary text-sm shrink-0"
                        />
                        <span className="text-muted text-xs">
                          Idea: {suggestionTitle || '—'}
                        </span>
                      </div>
                    )}
                    {status === 'purchased' && purchasedGiftTitle && (
                      <div className="mt-3 flex items-center gap-2">
                        <Icon
                          name="check-circle-fill"
                          className="text-green-600 text-base shrink-0"
                        />
                        <span className="text-foreground text-xs font-medium">
                          {purchasedGiftTitle}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>
      </aside>

      {/* Main: calendar fills available space beside fixed sidebar */}
      <main className="flex-1 min-w-0 flex flex-col gap-4 min-h-0 px-8">
        {/* Month + view switcher side by side (no border below) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 w-full border-0 border-b-0 flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-foreground text-2xl font-bold tracking-tight">
              {monthName}
            </h2>
            <div className="flex items-center rounded-lg overflow-hidden bg-calendar-bg">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1.5 text-foreground hover:bg-calendar-bg/80 transition-colors font-bold"
                aria-label="Previous month"
              >
                <Icon name="chevron-left" className="text-base" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-1.5 text-foreground hover:bg-calendar-bg/80 transition-colors font-bold"
                aria-label="Next month"
              >
                <Icon name="chevron-right" className="text-base" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToToday}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
                viewMode === 'today'
                  ? 'bg-calendar-bg text-foreground'
                  : 'bg-calendar-bg text-foreground hover:bg-calendar-bg/80'
              }`}
            >
              Today
            </button>
            <div className="flex rounded-lg overflow-hidden bg-calendar-bg/60">
              <button
                type="button"
                onClick={() => setViewMode('month')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  viewMode === 'month'
                    ? 'bg-calendar-bg text-foreground'
                    : 'text-foreground hover:bg-calendar-bg/80'
                }`}
              >
                Month
              </button>
              <button
                type="button"
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  viewMode === 'week'
                    ? 'bg-calendar-bg text-foreground'
                    : 'text-foreground hover:bg-calendar-bg/80'
                }`}
              >
                Week
              </button>
            </div>
          </div>
        </div>

        {/* Calendar: fills available space, responsive */}
        <div className="flex-1 min-h-0 min-w-0 w-full p-4 sm:p-6 border-0 flex flex-col overflow-hidden">
          {/* Month layout: flex (no grid), 7 columns via flex-basis */}
          <div className="flex flex-wrap flex-1 min-h-[50vh] sm:min-h-[55vh] lg:min-h-[60vh] rounded-lg overflow-hidden border-0 min-w-0">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((wd) => (
              <div
                key={wd}
                className="w-[14.285%] min-w-0 flex-shrink py-2 text-center text-xs font-semibold text-muted uppercase border-0"
              >
                {wd}
              </div>
            ))}
            {days.map((day, i) => {
              if (day === null) {
                return (
                  <div
                    key={`empty-${i}`}
                    className="w-[14.285%] min-w-0 flex-shrink min-h-[90px] sm:min-h-[110px] lg:min-h-[130px] xl:min-h-[150px]"
                  />
                );
              }
              const cellYMD = toYMD(viewYear, viewMonth, day);
              const isToday = cellYMD === todayYMD;
              const exactEvents = eventsByDate.get(cellYMD) ?? [];
              const repeatingEvents = events.filter(
                (e) =>
                  REPEATING_EVENT_TYPES.includes(e.type) &&
                  sameMonthDay(e.date, viewMonth, day)
              );
              const exactIds = new Set(exactEvents.map((e) => e.id));
              const dayEvents = [
                ...exactEvents,
                ...repeatingEvents.filter((e) => !exactIds.has(e.id)),
              ];
              return (
                <div
                  key={day}
                  className={`w-[14.285%] min-w-0 flex-shrink min-h-[90px] sm:min-h-[110px] lg:min-h-[130px] xl:min-h-[150px] flex flex-col p-2 ${
                    isToday ? 'border-t-4 border-t-primary' : ''
                  }`}
                >
                  <span
                    className={`text-sm font-semibold ${
                      isToday ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {day}
                  </span>
                  <div className="mt-1 flex flex-col gap-1 overflow-hidden">
                    {dayEvents.slice(0, 3).map((event) => (
                      <Link
                        key={event.id}
                        to={`/people/${event.personId}`}
                        className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-bold truncate bg-calendar-bg text-foreground hover:bg-calendar-bg/80"
                      >
                        <Icon
                          name={eventIcon(event.type)}
                          className="flex-shrink-0 text-[10px] text-muted"
                        />
                        <span className="truncate">{getPersonName(event.personId)}</span>
                      </Link>
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-muted text-xs px-2">
                        +{dayEvents.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* FAB */}
      <Link
        to="/add-person/step-1"
        className="fixed bottom-8 right-8 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:opacity-90 transition-opacity z-10"
        aria-label="Add person or event"
      >
        <Icon name="plus" className="text-2xl" />
      </Link>
    </div>
  );
}
