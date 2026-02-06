/**
 * React hooks for events data operations
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getAllEvents,
  getEventsByPersonId,
  getUpcomingEvents,
  createEvent as createEventService,
  updateEvent as updateEventService,
  deleteEvent as deleteEventService,
} from '@/services/eventsService';
import { fromEvent } from '@/utils/transformers';
import type { Event } from '@/types';
import type { InsertEvent, UpdateEvent } from '@/types/database';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await getAllEvents();
    if (response.error) {
      setError(response.error);
      setEvents([]);
    } else {
      setEvents(response.data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
}

export function useEventsByPerson(personId: string) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!personId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    getEventsByPersonId(personId).then((response) => {
      if (response.error) {
        setError(response.error);
        setEvents([]);
      } else {
        setEvents(response.data || []);
      }
      setLoading(false);
    });
  }, [personId]);

  return { events, loading, error };
}

export function useUpcomingEvents(limit?: number) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcoming = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await getUpcomingEvents(limit);
    if (response.error) {
      setError(response.error);
      setEvents([]);
    } else {
      setEvents(response.data || []);
    }
    setLoading(false);
  }, [limit]);

  useEffect(() => {
    fetchUpcoming();
  }, [fetchUpcoming]);

  return { events, loading, error, refetch: fetchUpcoming };
}

export function useCreateEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEvent = useCallback(
    async (event: Partial<Event>) => {
      setLoading(true);
      setError(null);
      const dbEvent = fromEvent(event) as InsertEvent;
      const response = await createEventService(dbEvent);
      if (response.error) {
        setError(response.error);
        setLoading(false);
        return null;
      }
      setLoading(false);
      return response.data;
    },
    []
  );

  return { createEvent, loading, error };
}

export function useUpdateEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateEvent = useCallback(
    async (id: string, updates: Partial<Event>) => {
      setLoading(true);
      setError(null);
      const dbUpdates = fromEvent(updates) as UpdateEvent;
      const response = await updateEventService(id, dbUpdates);
      if (response.error) {
        setError(response.error);
        setLoading(false);
        return null;
      }
      setLoading(false);
      return response.data;
    },
    []
  );

  return { updateEvent, loading, error };
}

export function useDeleteEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteEvent = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    const response = await deleteEventService(id);
    if (response.error) {
      setError(response.error);
      setLoading(false);
      return false;
    }
    setLoading(false);
    return true;
  }, []);

  return { deleteEvent, loading, error };
}
