/**
 * Service for people table operations
 */

import { supabase } from '@/lib/supabase';
import { createServiceResponse, type ServiceResponse } from './base';
import { toPerson, toProfile } from '@/utils/transformers';
import type { Person } from '@/types';
import type {
  DatabasePerson,
  DatabaseProfile,
  InsertPerson,
  UpdatePerson,
} from '@/types/database';

export async function getAllPeople(): Promise<ServiceResponse<Person[]>> {
  const { data, error } = await supabase
    .from('people')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    return createServiceResponse<Person[]>(null, error);
  }

  const people = (data || []).map((dbPerson: DatabasePerson) =>
    toPerson(dbPerson)
  );
  return createServiceResponse(people, null);
}

export async function getPersonById(
  id: string
): Promise<ServiceResponse<Person>> {
  const { data, error } = await supabase
    .from('people')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return createServiceResponse<Person>(null, error);
  }

  return createServiceResponse(toPerson(data as DatabasePerson), null);
}

export async function createPerson(
  person: InsertPerson
): Promise<ServiceResponse<Person>> {
  const { data, error } = await supabase
    .from('people')
    .insert(person)
    .select()
    .single();

  if (error) {
    return createServiceResponse<Person>(null, error);
  }

  return createServiceResponse(toPerson(data as DatabasePerson), null);
}

export async function updatePerson(
  id: string,
  updates: UpdatePerson
): Promise<ServiceResponse<Person>> {
  const { data, error } = await supabase
    .from('people')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return createServiceResponse<Person>(null, error);
  }

  return createServiceResponse(toPerson(data as DatabasePerson), null);
}

export async function deletePerson(
  id: string
): Promise<ServiceResponse<void>> {
  const { error } = await supabase.from('people').delete().eq('id', id);

  if (error) {
    return createServiceResponse<void>(null, error);
  }

  return createServiceResponse<void>(undefined, null);
}

export async function getPersonWithProfile(
  id: string
): Promise<ServiceResponse<Person & { profile?: import('@/types').Profile }>> {
  const { data, error } = await supabase
    .from('people')
    .select('*, profiles(*)')
    .eq('id', id)
    .single();

  if (error) {
    return createServiceResponse<
      Person & { profile?: import('@/types').Profile }
    >(null, error);
  }

  const person = toPerson(data as DatabasePerson);
  const profileData = (data as any).profiles?.[0];
  const profile = profileData
    ? toProfile(profileData as DatabaseProfile)
    : undefined;

  return createServiceResponse(
    { ...person, profile },
    null
  );
}
