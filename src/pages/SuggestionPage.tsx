import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { useGiftSuggestions } from '@/hooks/useGiftSuggestions';

export function SuggestionPage() {
  const { people, selectedPersonId } = useApp();
  const navigate = useNavigate();
  const { suggestions, loading, error } = useGiftSuggestions(
    selectedPersonId || ''
  );

  const selectedPerson = selectedPersonId
    ? people.find((p) => p.id === selectedPersonId)
    : null;

  if (!selectedPersonId || !selectedPerson) {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Gift Suggestions
        </h2>
        <p className="text-slate-600 mb-4">
          Select a person from the People page to see gift suggestions.
        </p>
        <button
          type="button"
          onClick={() => navigate('/people')}
          className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition"
        >
          Go to People
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">
        Gift Suggestions for {selectedPerson.name}
      </h2>
      <p className="text-slate-600 mb-4">
        Suggestions based on profile and interests.
      </p>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          Error loading suggestions: {error}
        </div>
      )}
      {loading ? (
        <div className="text-slate-500">Loading suggestions...</div>
      ) : (
        <ul className="space-y-4">
          {suggestions.length === 0 ? (
            <li className="bg-white rounded-lg border border-slate-200 p-4 text-slate-500">
              No suggestions yet. Add interests and hints in the person&apos;s
              profile.
            </li>
          ) : (
            suggestions.map((s) => (
            <li
              key={s.id}
              className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm"
            >
              <span className="font-medium text-slate-800 block">{s.title}</span>
              <p className="text-slate-600 text-sm mt-1">{s.description}</p>
              <p className="text-slate-500 text-sm mt-1 italic">{s.reason}</p>
              {s.category && (
                <span className="inline-block mt-2 text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                  {s.category}
                </span>
              )}
            </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
