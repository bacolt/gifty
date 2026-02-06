/**
 * React hooks for people data operations
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getAllPeople,
  getPersonById,
  createPerson as createPersonService,
  updatePerson as updatePersonService,
  deletePerson as deletePersonService,
} from '@/services/peopleService';
import { fromPerson } from '@/utils/transformers';
import type { Person } from '@/types';
import type { InsertPerson, UpdatePerson } from '@/types/database';

export function usePeople() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPeople = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await getAllPeople();
    if (response.error) {
      setError(response.error);
      setPeople([]);
    } else {
      setPeople(response.data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  return { people, loading, error, refetch: fetchPeople };
}

export function usePerson(id: string) {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    getPersonById(id).then((response) => {
      if (response.error) {
        setError(response.error);
        setPerson(null);
      } else {
        setPerson(response.data);
      }
      setLoading(false);
    });
  }, [id]);

  return { person, loading, error };
}

export function useCreatePerson() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPerson = useCallback(
    async (person: Partial<Person>) => {
      setLoading(true);
      setError(null);
      const dbPerson = fromPerson(person) as InsertPerson;
      const response = await createPersonService(dbPerson);
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

  return { createPerson, loading, error };
}

export function useUpdatePerson() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePerson = useCallback(
    async (id: string, updates: Partial<Person>) => {
      setLoading(true);
      setError(null);
      const dbUpdates = fromPerson(updates) as UpdatePerson;
      const response = await updatePersonService(id, dbUpdates);
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

  return { updatePerson, loading, error };
}

export function useDeletePerson() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deletePerson = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    const response = await deletePersonService(id);
    if (response.error) {
      setError(response.error);
      setLoading(false);
      return false;
    }
    setLoading(false);
    return true;
  }, []);

  return { deletePerson, loading, error };
}
