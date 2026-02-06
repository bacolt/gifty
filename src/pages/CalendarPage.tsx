import { useApp } from '@/context/AppContext';
import { formatDate } from '@/utils/formatDate';

export function CalendarPage() {
  const { events, people } = useApp();

  const getPersonName = (personId: string) =>
    people.find((p) => p.id === personId)?.name ?? 'Unknown';

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Calendar</h2>
      <p className="text-slate-600 mb-4">
        Upcoming events and occasions. Calendar view coming soon.
      </p>
      <ul className="space-y-2">
        {events.map((event) => (
          <li
            key={event.id}
            className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm"
          >
            <span className="font-medium text-slate-800">{event.title}</span>
            <span className="text-slate-500 ml-2">
              — {getPersonName(event.personId)}
            </span>
            <span className="block text-sm text-slate-600 mt-1">
              {formatDate(event.date)} · {event.type}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
