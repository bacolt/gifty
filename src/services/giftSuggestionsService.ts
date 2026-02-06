/**
 * Service for gift_suggestions table operations
 */

import { supabase } from '@/lib/supabase';
import { createServiceResponse, type ServiceResponse } from './base';
import { toGiftSuggestion } from '@/utils/transformers';
import type { GiftSuggestion } from '@/types';
import type {
  DatabaseGiftSuggestion,
  InsertGiftSuggestion,
  UpdateGiftSuggestion,
} from '@/types/database';

export async function getGiftSuggestionsByPersonId(
  personId: string
): Promise<ServiceResponse<GiftSuggestion[]>> {
  const { data, error } = await supabase
    .from('gift_suggestions')
    .select('*')
    .eq('person_id', personId)
    .order('created_at', { ascending: false });

  if (error) {
    return createServiceResponse<GiftSuggestion[]>(null, error);
  }

  const suggestions = (data || []).map((dbSuggestion: DatabaseGiftSuggestion) =>
    toGiftSuggestion(dbSuggestion)
  );
  return createServiceResponse(suggestions, null);
}

export async function createGiftSuggestion(
  suggestion: InsertGiftSuggestion
): Promise<ServiceResponse<GiftSuggestion>> {
  const { data, error } = await supabase
    .from('gift_suggestions')
    .insert(suggestion)
    .select()
    .single();

  if (error) {
    return createServiceResponse<GiftSuggestion>(null, error);
  }

  return createServiceResponse(
    toGiftSuggestion(data as DatabaseGiftSuggestion),
    null
  );
}

export async function updateGiftSuggestion(
  id: string,
  updates: UpdateGiftSuggestion
): Promise<ServiceResponse<GiftSuggestion>> {
  const { data, error } = await supabase
    .from('gift_suggestions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return createServiceResponse<GiftSuggestion>(null, error);
  }

  return createServiceResponse(
    toGiftSuggestion(data as DatabaseGiftSuggestion),
    null
  );
}

export async function deleteGiftSuggestion(
  id: string
): Promise<ServiceResponse<void>> {
  const { error } = await supabase
    .from('gift_suggestions')
    .delete()
    .eq('id', id);

  if (error) {
    return createServiceResponse<void>(null, error);
  }

  return createServiceResponse<void>(undefined, null);
}
