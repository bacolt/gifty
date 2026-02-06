/**
 * React hooks for social accounts data operations
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getSocialAccountsByPersonId,
  createSocialAccount as createSocialAccountService,
  deleteSocialAccount as deleteSocialAccountService,
} from '@/services/socialAccountsService';
import { fromSocialAccount } from '@/utils/transformers';
import type { SocialAccount } from '@/types';
import type { InsertSocialAccount } from '@/types/database';

export function useSocialAccountsByPerson(personId: string) {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!personId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    getSocialAccountsByPersonId(personId).then((response) => {
      if (response.error) {
        setError(response.error);
        setAccounts([]);
      } else {
        setAccounts(response.data || []);
      }
      setLoading(false);
    });
  }, [personId]);

  return { accounts, loading, error };
}

export function useCreateSocialAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSocialAccount = useCallback(
    async (account: Partial<SocialAccount>) => {
      setLoading(true);
      setError(null);
      const dbAccount = fromSocialAccount(account) as InsertSocialAccount;
      // Ensure is_active is true and don't set last_checked_at
      const accountToInsert: InsertSocialAccount = {
        ...dbAccount,
        is_active: true,
      };
      const response = await createSocialAccountService(accountToInsert);
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

  return { createSocialAccount, loading, error };
}

export function useDeleteSocialAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteSocialAccount = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    const response = await deleteSocialAccountService(id);
    if (response.error) {
      setError(response.error);
      setLoading(false);
      return false;
    }
    setLoading(false);
    return true;
  }, []);

  return { deleteSocialAccount, loading, error };
}
