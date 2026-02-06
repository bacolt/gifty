import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { formatDate } from '@/utils/formatDate';
import { PersonCard } from '@/components/PersonCard';

export function PeoplePage() {
  const { people } = useApp();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">People</h2>
          <p className="text-slate-600 mt-1">
            People in your gift list. Click a person to see gift suggestions.
          </p>
        </div>
        <Link
          to="/add-person/step-1"
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90"
        >
          <span className="material-symbols-outlined text-sm">person_add</span>
          Add Person
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {people.map((person) => (
          <PersonCard
            key={person.id}
            to={`/people/${person.id}`}
            name={person.name}
            relationship={person.relationship}
            avatarUrl={person.avatarUrl}
            nextEventLabel={`Birthday • ${formatDate(person.birthday)}`}
            status="not_started"
            statusLabel="Not started"
            likes={[]}
            buttonLabel="View Profile"
            buttonIcon="badge"
          />
        ))}
      </div>
    </div>
  );
}
