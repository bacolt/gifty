import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { formatDate } from '@/utils/formatDate';

export function PeoplePage() {
  const { people, setSelectedPersonId } = useApp();
  const navigate = useNavigate();

  function handleSelectPerson(personId: string) {
    setSelectedPersonId(personId);
    navigate('/suggestions');
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">People</h2>
      <p className="text-slate-600 mb-4">
        People in your gift list. Click a person to see gift suggestions.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
          <li key={person.id}>
            <button
              type="button"
              onClick={() => handleSelectPerson(person.id)}
              className="w-full text-left bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:border-slate-300 hover:shadow transition"
            >
              <span className="font-medium text-slate-800 block">{person.name}</span>
              <span className="text-sm text-slate-600 block mt-1">
                Birthday: {formatDate(person.birthday)}
              </span>
              {person.notes && (
                <span className="text-sm text-slate-500 block mt-1">
                  {person.notes}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
