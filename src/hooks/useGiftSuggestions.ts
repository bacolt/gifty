/**
 * React hooks for gift suggestions data operations
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getGiftSuggestionsByPersonId,
  createGiftSuggestion as createGiftSuggestionService,
  updateGiftSuggestion as updateGiftSuggestionService,
  deleteGiftSuggestion as deleteGiftSuggestionService,
} from '@/services/giftSuggestionsService';
import { fromGiftSuggestion } from '@/utils/transformers';
import type { GiftSuggestion } from '@/types';
import type {
  InsertGiftSuggestion,
  UpdateGiftSuggestion,
} from '@/types/database';

export function useGiftSuggestions(personId: string) {
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = useCallback(async () => {
    if (!personId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    const response = await getGiftSuggestionsByPersonId(personId);
    if (response.error) {
      setError(response.error);
      setSuggestions([]);
    } else {
      setSuggestions(response.data || []);
    }
    setLoading(false);
  }, [personId]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  return { suggestions, loading, error, refetch: fetchSuggestions };
}

export function useCreateGiftSuggestion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createGiftSuggestion = useCallback(
    async (suggestion: Partial<GiftSuggestion>) => {
      setLoading(true);
      setError(null);
      const dbSuggestion = fromGiftSuggestion(
        suggestion
      ) as InsertGiftSuggestion;
      const response = await createGiftSuggestionService(dbSuggestion);
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

  return { createGiftSuggestion, loading, error };
}

export function useUpdateGiftSuggestion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateGiftSuggestion = useCallback(
    async (id: string, updates: Partial<GiftSuggestion>) => {
      setLoading(true);
      setError(null);
      const dbUpdates = fromGiftSuggestion(updates) as UpdateGiftSuggestion;
      const response = await updateGiftSuggestionService(id, dbUpdates);
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

  return { updateGiftSuggestion, loading, error };
}

export function useDeleteGiftSuggestion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteGiftSuggestion = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    const response = await deleteGiftSuggestionService(id);
    if (response.error) {
      setError(response.error);
      setLoading(false);
      return false;
    }
    setLoading(false);
    return true;
  }, []);

  return { deleteGiftSuggestion, loading, error };
}
