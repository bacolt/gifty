import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Icon } from '@/components/ui/Icon';
import { formatDate, daysUntil } from '@/utils/formatDate';
import type { Event } from '@/types';

const REPEATING_TYPES: Event['type'][] = ['birthday', 'anniversary'];

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

function eventTypeLabel(type: Event['type']): string {
  switch (type) {
    case 'birthday':
      return 'BIRTHDAY';
    case 'anniversary':
      return 'ANNIVERSARY';
    case 'name_day':
      return 'NAME DAY';
    default:
      return 'CELEBRATION';
  }
}

function eventIconName(type: Event['type']): string {
  switch (type) {
    case 'birthday':
      return 'cake-fill';
    case 'anniversary':
      return 'heart-fill';
    case 'name_day':
      return 'person';
    default:
      return 'calendar-event';
  }
}

function formatTimelineDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
}

function formatTimelineDateParts(dateStr: string): { month: string; day: string } {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = date.getDate().toString();
  return { month, day };
}

export function DashboardPage() {
  const { people = [], events = [] } = useApp();

  const getPersonName = (id: string) =>
    people.find((p) => p.id === id)?.name ?? 'Unknown';
  const getPersonRelationship = (id: string) =>
    people.find((p) => p.id === id)?.relationship ?? '';
  const getPersonAvatar = (id: string) =>
    people.find((p) => p.id === id)?.avatarUrl;

  const timelineEvents = useMemo(() => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toISOString().slice(0, 10);

      const withDisplayDate = (events ?? []).map((e) => {
        const dateStr = e?.date ?? '';
        let displayDate = dateStr;
        if (dateStr.length >= 10 && REPEATING_TYPES.includes(e.type)) {
          const parts = dateStr.split('-').map(Number);
          const m = parts[1];
          const d = parts[2];
          if (!Number.isNaN(m) && !Number.isNaN(d)) {
            const thisYear = today.getFullYear();
            const thisYearOccurrence = new Date(thisYear, m - 1, d);
            displayDate =
              thisYearOccurrence.getTime() >= today.getTime()
                ? `${thisYear}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
                : `${thisYear + 1}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          }
        }
        return { event: e, displayDate };
      });

    const future = withDisplayDate
      .filter(({ displayDate }) => displayDate >= todayStr)
      .sort((a, b) => a.displayDate.localeCompare(b.displayDate))
      .slice(0, 6);
    const past = withDisplayDate
      .filter(({ displayDate }) => displayDate < todayStr)
      .sort((a, b) => b.displayDate.localeCompare(a.displayDate))
      .slice(0, 2);
    const combined = [...future, ...past]
      .filter(({ displayDate }) => displayDate && displayDate.length >= 10)
      .map(({ event, displayDate }) => {
        const d = daysUntil(displayDate);
        const isPast = d < 0;
        const statusBadge = isPast
          ? 'ARRIVED'
          : d === 0
            ? 'TODAY'
            : d === 1
              ? '1 DAY LEFT'
              : `${d} DAYS LEFT`;
        const displayYear = parseInt(displayDate.slice(0, 4), 10);
        const eventYear = parseInt((event.date ?? '').slice(0, 4), 10);
        const years = Number.isFinite(displayYear) && Number.isFinite(eventYear) ? displayYear - eventYear : 0;
        const name = getPersonName(event.personId);
        const relationship = getPersonRelationship(event.personId);
        const recipientLine =
          event.type === 'birthday'
            ? `${relationship || 'Person'} • ${ordinal(years)} Birthday`
            : event.type === 'anniversary'
              ? `${relationship || 'Partner'} • ${ordinal(years)} Anniversary`
              : `${formatDate(event.date)} • Milestone Event`;

        const giftStatus = event.giftStatus ?? 'not_planned';
        const step = giftStatus === 'not_planned' ? 0 : giftStatus === 'ideas_gathered' ? (event.chosenSuggestionId ? 2 : 1) : 3;
        const stepLabels = ['BRAINSTORMED', 'SELECTED', 'ORDERED'];
        const readyLabel = step === 0 ? 'NOT STARTED' : step === 3 ? '100% READY' : `${Math.round((step / 3) * 100)}% READY`;
        const ctaLabel = step === 0 ? 'Start Brainstorming' : step === 3 ? 'Track Shipment' : 'Complete Selection';
        const isUrgent = !isPast && d <= 9 && step === 0;

        const dateParts = formatTimelineDateParts(displayDate);
        return {
          event,
          displayDate,
          isPast,
          isUrgent,
          statusBadge,
          dateLabel: formatTimelineDate(displayDate),
          dateMonth: dateParts.month,
          dateDay: dateParts.day,
          avatarUrl: getPersonAvatar(event.personId),
          title: event.type === 'birthday' ? `${name}'s Birthday` : event.type === 'anniversary' ? `${ordinal(years)} Wedding Anniversary` : event.title,
          recipientLine,
          step,
          stepLabels,
          readyLabel,
          ctaLabel,
          typeLabel: eventTypeLabel(event.type),
          iconName: eventIconName(event.type),
        };
      });
      return combined;
    } catch {
      return [];
    }
  }, [events, people]);

  const suggestionCount = 12; // placeholder; could come from API later

  return (
    <>
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full">
      {/* Left: Planning Timeline */}
      <div className="flex-1 min-w-0">
        <h2 className="text-foreground text-2xl font-bold tracking-tight mb-1">
          Planning Timeline
        </h2>
        <p className="text-muted text-sm mb-8">
          Your high-priority gift tracking and upcoming deadlines.
        </p>

        <div className="relative pl-8 sm:pl-10">
          {/* Vertical timeline line – at 24px so it passes through center of marker (marker -left-8, w-12) */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/30 rounded-full" />

          <div className="space-y-6">
            {timelineEvents.length === 0 ? (
              <div className="bg-white rounded-xl border border-border p-8 text-center text-muted">
                <p className="mb-4">No upcoming events yet.</p>
                <Link
                  to="/add-person/step-1"
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90"
                >
                  <Icon name="plus" />
                  Add a person
                </Link>
              </div>
            ) : (
              timelineEvents.map((item) => (
                <div key={item.event.id} className="relative flex gap-4">
                  {/* Timeline marker: in timeline column; orange when urgent (< 10 days, not started) */}
                  <div className={`absolute -left-8 sm:-left-10 top-5 flex flex-col items-center justify-center w-12 h-12 rounded-full bg-white border-[3px] z-10 ${
                    item.isUrgent ? 'border-amber-500' : 'border-primary/50'
                  }`}>
                    {item.isPast ? (
                      <Icon name="check-circle-fill" className="text-green-600 text-xl" />
                    ) : (
                      <>
                        <span className={`text-[8px] font-bold leading-none ${
                          item.isUrgent ? 'text-amber-600' : 'text-primary'
                        }`}>
                          {item.dateMonth}
                        </span>
                        <span className={`text-base font-bold leading-none mt-0.5 ${
                          item.isUrgent ? 'text-amber-700' : 'text-foreground'
                        }`}>
                          {item.dateDay}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Card: 32px gap from marker (marker ends at 48px; card row starts at 32px, so ml-12 = 48px → card at 80px, gap 32px) */}
                  <div className="flex-1 min-w-0 ml-12 bg-white rounded-xl border border-border shadow-sm p-5">
                    {/* Top row: status pill (clock + days left) + type • CTA button */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          item.isUrgent
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-primary/15 text-primary'
                        }`}>
                          <Icon name={item.isUrgent ? 'calendar-x-fill' : 'clock'} className="text-xs" />
                          {item.statusBadge}
                        </span>
                        <span className="text-muted text-xs font-semibold">•</span>
                        <span className="text-foreground text-xs font-semibold uppercase">
                          {item.typeLabel}
                        </span>
                      </div>
                      <Link
                        to={`/people/${item.event.personId}`}
                        className={`shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
                          item.step === 0
                            ? 'bg-surface text-foreground hover:bg-surface-muted'
                            : 'bg-primary text-white hover:opacity-90'
                        }`}
                      >
                        {item.ctaLabel}
                      </Link>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-muted text-sm mb-5">
                      {item.avatarUrl ? (
                        <div
                          className="size-8 rounded-full bg-surface bg-center bg-cover shrink-0"
                          style={{ backgroundImage: `url("${item.avatarUrl}")` }}
                          role="img"
                          aria-hidden
                        />
                      ) : (
                        <div className="size-8 rounded-full bg-surface flex items-center justify-center shrink-0">
                          <Icon name={item.iconName} className="text-primary text-sm" />
                        </div>
                      )}
                      <span>{item.recipientLine}</span>
                    </div>
                    {/* Gift Readiness: label, horizontal bar with circles + labels, % on right */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <p className="text-[10px] font-bold text-muted uppercase tracking-wider w-full sm:w-auto">
                        Gift Readiness
                      </p>
                      <div className="flex-1 min-w-0 flex items-center gap-1 sm:gap-2">
                        {item.stepLabels.map((label, i) => (
                          <div key={label} className="flex items-center flex-1 min-w-0">
                            <div className="flex flex-col items-center shrink-0">
                              <span
                                className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold border-2 ${
                                  i < item.step
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-muted border-border'
                                }`}
                              >
                                {i < item.step ? <Icon name="check" className="text-xs" /> : null}
                              </span>
                              <span
                                className={`text-[10px] font-semibold mt-1 ${
                                  i < item.step ? 'text-primary' : 'text-muted'
                                }`}
                              >
                                {label}
                              </span>
                            </div>
                            {i < item.stepLabels.length - 1 && (
                              <span
                                className={`flex-1 h-0.5 mx-0.5 rounded min-w-[8px] ${
                                  i < item.step ? 'bg-primary' : 'bg-surface'
                                }`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      <span className="text-sm font-bold text-primary shrink-0">
                        {item.readyLabel}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right: Your People + Need a spark? */}
      <div className="lg:w-80 xl:w-96 shrink-0 flex flex-col gap-6">

        <section>
          <h3 className="text-foreground font-bold text-lg mb-3 flex items-center gap-2">
            <Icon name="people" className="text-muted" />
            Your People
          </h3>
          <div className="space-y-2">
            {people.length === 0 ? (
              <p className="text-muted text-sm">No people yet.</p>
            ) : (
              people.slice(0, 5).map((person) => (
                <Link
                  key={person.id}
                  to={`/people/${person.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className="size-10 rounded-full bg-surface bg-center bg-cover shrink-0"
                    style={{
                      backgroundImage: person.avatarUrl ? `url("${person.avatarUrl}")` : undefined,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">
                      {person.name}
                    </p>
                    <p className="text-muted text-xs uppercase font-medium">
                      {(person.relationship ?? 'Person').toUpperCase().replace(/\s+/g, ' ')}
                    </p>
                  </div>
                  <Icon name="chevron-right" className="text-muted shrink-0" />
                </Link>
              ))
            )}
          </div>
        </section>

        <section className="bg-primary/10 rounded-xl border border-primary/20 p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
              <Icon name="stars" className="text-primary text-xl" />
            </div>
            <div>
              <h3 className="text-foreground font-bold text-lg">Need a spark?</h3>
              <p className="text-muted text-sm mt-0.5">
                We've discovered {suggestionCount} unique items matching your people's style for
                upcoming events.
              </p>
            </div>
          </div>
          <Link
            to="/suggestions"
            className="w-full bg-foreground text-white rounded-lg py-3 px-4 font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90"
          >
            Explore Recommendations
          </Link>
        </section>
      </div>
    </div>

      {/* FAB */}
      <Link
        to="/suggestions"
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-background-dark text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
        aria-label="Get AI ideas"
      >
        <Icon name="stars" className="text-2xl" />
      </Link>
    </>
  );
}
