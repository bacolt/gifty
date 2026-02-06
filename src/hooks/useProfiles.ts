/**
 * React hooks for profiles data operations
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getProfileByPersonId,
  createProfile as createProfileService,
  updateProfile as updateProfileService,
  upsertProfile as upsertProfileService,
} from '@/services/profilesService';
import { fromProfile } from '@/utils/transformers';
import type { Profile } from '@/types';
import type { InsertProfile, UpdateProfile } from '@/types/database';

export function useProfile(personId: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!personId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    getProfileByPersonId(personId).then((response) => {
      if (response.error) {
        setError(response.error);
        setProfile(null);
      } else {
        setProfile(response.data);
      }
      setLoading(false);
    });
  }, [personId]);

  return { profile, loading, error };
}

export function useUpsertProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upsertProfile = useCallback(
    async (profile: Partial<Profile>) => {
      setLoading(true);
      setError(null);
      const dbProfile = fromProfile(profile) as InsertProfile;
      const response = await upsertProfileService(dbProfile);
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

  return { upsertProfile, loading, error };
}

export function useCreateProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProfile = useCallback(
    async (profile: Partial<Profile>) => {
      setLoading(true);
      setError(null);
      const dbProfile = fromProfile(profile) as InsertProfile;
      const response = await createProfileService(dbProfile);
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

  return { createProfile, loading, error };
}

export function useUpdateProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = useCallback(
    async (personId: string, updates: Partial<Profile>) => {
      setLoading(true);
      setError(null);
      const dbUpdates = fromProfile(updates) as UpdateProfile;
      const response = await updateProfileService(personId, dbUpdates);
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

  return { updateProfile, loading, error };
}
