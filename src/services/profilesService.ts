/**
 * Service for profiles table operations
 */

import { supabase } from '@/lib/supabase';
import { createServiceResponse, type ServiceResponse } from './base';
import { toProfile } from '@/utils/transformers';
import type { Profile } from '@/types';
import type {
  DatabaseProfile,
  InsertProfile,
  UpdateProfile,
} from '@/types/database';

export async function getProfileByPersonId(
  personId: string
): Promise<ServiceResponse<Profile | null>> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('person_id', personId)
    .maybeSingle();

  if (error) {
    return createServiceResponse<Profile | null>(null, error);
  }

  if (!data) {
    return createServiceResponse<Profile | null>(null, null);
  }

  return createServiceResponse(toProfile(data as DatabaseProfile), null);
}

export async function createProfile(
  profile: InsertProfile
): Promise<ServiceResponse<Profile>> {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single();

  if (error) {
    return createServiceResponse<Profile>(null, error);
  }

  return createServiceResponse(toProfile(data as DatabaseProfile), null);
}

export async function updateProfile(
  personId: string,
  updates: UpdateProfile
): Promise<ServiceResponse<Profile>> {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('person_id', personId)
    .select()
    .single();

  if (error) {
    return createServiceResponse<Profile>(null, error);
  }

  return createServiceResponse(toProfile(data as DatabaseProfile), null);
}

export async function upsertProfile(
  profile: InsertProfile
): Promise<ServiceResponse<Profile>> {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile, {
      onConflict: 'person_id',
    })
    .select()
    .single();

  if (error) {
    return createServiceResponse<Profile>(null, error);
  }

  return createServiceResponse(toProfile(data as DatabaseProfile), null);
}
