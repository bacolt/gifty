import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { Person, Event } from '@/types';
import {
  mockPeople,
  mockEvents,
} from '@/data/mockData';

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

const initialState: AppState = {
  people: mockPeople,
  events: mockEvents,
  selectedPersonId: null,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [people, setPeople] = useState<Person[]>(initialState.people);
  const [events, setEvents] = useState<Event[]>(initialState.events);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(
    initialState.selectedPersonId
  );

  const setPeopleSafe = useCallback(
    (value: Person[] | ((prev: Person[]) => Person[])) => {
      setPeople(value);
    },
    []
  );
  const setEventsSafe = useCallback(
    (value: Event[] | ((prev: Event[]) => Event[])) => {
      setEvents(value);
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
