/**
 * Service for social_accounts table operations
 */

import { supabase } from '@/lib/supabase';
import { createServiceResponse, type ServiceResponse } from './base';
import { toSocialAccount } from '@/utils/transformers';
import type { SocialAccount } from '@/types';
import type {
  DatabaseSocialAccount,
  InsertSocialAccount,
} from '@/types/database';

export async function createSocialAccount(
  account: InsertSocialAccount
): Promise<ServiceResponse<SocialAccount>> {
  const { data, error } = await supabase
    .from('social_accounts')
    .insert(account)
    .select()
    .single();

  if (error) {
    return createServiceResponse<SocialAccount>(null, error);
  }

  return createServiceResponse(toSocialAccount(data as DatabaseSocialAccount), null);
}

export async function getSocialAccountsByPersonId(
  personId: string
): Promise<ServiceResponse<SocialAccount[]>> {
  const { data, error } = await supabase
    .from('social_accounts')
    .select('*')
    .eq('person_id', personId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    return createServiceResponse<SocialAccount[]>(null, error);
  }

  const accounts = (data || []).map((dbAccount: DatabaseSocialAccount) =>
    toSocialAccount(dbAccount)
  );
  return createServiceResponse(accounts, null);
}

export async function deleteSocialAccount(
  id: string
): Promise<ServiceResponse<void>> {
  const { error } = await supabase
    .from('social_accounts')
    .delete()
    .eq('id', id);

  if (error) {
    return createServiceResponse<void>(null, error);
  }

  return createServiceResponse<void>(undefined, null);
}
