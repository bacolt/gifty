import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Person, Event } from '@/types';
import { usePeople } from '@/hooks/usePeople';
import { useEvents } from '@/hooks/useEvents';

interface AppState {
  people: Person[];
  events: Event[];
  selectedPersonId: string | null;
}

interface AppContextValue extends AppState {
  setPeople: (people: Person[] | ((prev: Person[]) => Person[])) => void;
  setEvents: (events: Event[] | ((prev: Event[]) => Event[])) => void;
  setSelectedPersonId: (id: string | null) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { people: fetchedPeople } = usePeople();
  const { events: fetchedEvents } = useEvents();

  const [people, setPeople] = useState<Person[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(
    null
  );

  // Sync fetched data with context state
  useEffect(() => {
    if (fetchedPeople) {
      setPeople(fetchedPeople);
    }
  }, [fetchedPeople]);

  useEffect(() => {
    if (fetchedEvents) {
      setEvents(fetchedEvents);
    }
  }, [fetchedEvents]);

  const setPeopleSafe = useCallback(
    (value: Person[] | ((prev: Person[]) => Person[])) => {
      setPeople(value);
      // Optionally refetch after manual update
      // refetchPeople();
    },
    []
  );
  const setEventsSafe = useCallback(
    (value: Event[] | ((prev: Event[]) => Event[])) => {
      setEvents(value);
      // Optionally refetch after manual update
      // refetchEvents();
    },
    []
  );

  const value: AppContextValue = {
    people,
    events,
    selectedPersonId,
    setPeople: setPeopleSafe,
    setEvents: setEventsSafe,
    setSelectedPersonId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }
  return ctx;
}
