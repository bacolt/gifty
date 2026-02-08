/**
 * Service for events table operations
 */

import { supabase } from '@/lib/supabase';
import { createServiceResponse, type ServiceResponse } from './base';
import { toEvent } from '@/utils/transformers';
import type { Event } from '@/types';
import type {
  DatabaseEventRow,
  InsertEvent,
  UpdateEvent,
} from '@/types/database';

/** Select all event columns. Join for chosen suggestion title can be added when FK relation is confirmed. */
const EVENTS_SELECT = '*';

export async function getAllEvents(): Promise<ServiceResponse<Event[]>> {
  const { data, error } = await supabase
    .from('events')
    .select(EVENTS_SELECT)
    .order('date', { ascending: true });

  if (error) {
    return createServiceResponse<Event[]>(null, error);
  }

  const events = (data || []).map((row) =>
    toEvent(row as DatabaseEventRow)
  );
  return createServiceResponse(events, null);
}

export async function getEventsByPersonId(
  personId: string
): Promise<ServiceResponse<Event[]>> {
  const { data, error } = await supabase
    .from('events')
    .select(EVENTS_SELECT)
    .eq('person_id', personId)
    .order('date', { ascending: true });

  if (error) {
    return createServiceResponse<Event[]>(null, error);
  }

  const events = (data || []).map((row) =>
    toEvent(row as DatabaseEventRow)
  );
  return createServiceResponse(events, null);
}

export async function getUpcomingEvents(
  limit?: number
): Promise<ServiceResponse<Event[]>> {
  const today = new Date().toISOString().split('T')[0];
  let query = supabase
    .from('events')
    .select(EVENTS_SELECT)
    .gte('date', today)
    .order('date', { ascending: true });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    return createServiceResponse<Event[]>(null, error);
  }

  const events = (data || []).map((row) =>
    toEvent(row as DatabaseEventRow)
  );
  return createServiceResponse(events, null);
}

export async function createEvent(
  event: InsertEvent
): Promise<ServiceResponse<Event>> {
  const { data, error } = await supabase
    .from('events')
    .insert(event)
    .select()
    .single();

  if (error) {
    return createServiceResponse<Event>(null, error);
  }

  return createServiceResponse(toEvent(data as DatabaseEventRow), null);
}

export async function updateEvent(
  id: string,
  updates: UpdateEvent
): Promise<ServiceResponse<Event>> {
  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return createServiceResponse<Event>(null, error);
  }

  return createServiceResponse(toEvent(data as DatabaseEventRow), null);
}

export async function deleteEvent(id: string): Promise<ServiceResponse<void>> {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) {
    return createServiceResponse<void>(null, error);
  }

  return createServiceResponse<void>(undefined, null);
}
