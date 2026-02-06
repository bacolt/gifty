import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { useCreatePerson } from '@/hooks/usePeople';
import { useUpsertProfile } from '@/hooks/useProfiles';
import { useCreateEvent } from '@/hooks/useEvents';
import { useCreateSocialAccount } from '@/hooks/useSocialAccounts';

export interface AddPersonFormData {
  name: string;
  relationship: string;
  interests: string[];
  birthday: string;
  milestones: Array<{ type: string; date: string }>;
  socialAccounts: Array<{ platform: string; username: string; profileUrl: string }>;
}

interface AddPersonContextValue {
  formData: AddPersonFormData;
  updateFormData: (updates: Partial<AddPersonFormData>) => void;
  resetForm: () => void;
  submitForm: () => Promise<{ success: boolean; personId?: string; error?: string }>;
}

const initialFormData: AddPersonFormData = {
  name: '',
  relationship: '',
  interests: [],
  birthday: '',
  milestones: [],
  socialAccounts: [],
};

const AddPersonContext = createContext<AddPersonContextValue | null>(null);

export function AddPersonProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<AddPersonFormData>(initialFormData);
  const { createPerson } = useCreatePerson();
  const { upsertProfile } = useUpsertProfile();
  const { createEvent } = useCreateEvent();
  const { createSocialAccount } = useCreateSocialAccount();

  const updateFormData = useCallback((updates: Partial<AddPersonFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  const submitForm = useCallback(async () => {
    try {
      // 1. Create person
      const person = await createPerson({
        name: formData.name,
        relationship: formData.relationship,
        birthday: formData.birthday,
      });

      if (!person) {
        return { success: false, error: 'Failed to create person' };
      }

      // 2. Create profile with interests
      if (formData.interests.length > 0) {
        await upsertProfile({
          personId: person.id,
          interests: formData.interests,
        });
      }

      // 3. Create birthday event
      if (formData.birthday) {
        await createEvent({
          personId: person.id,
          title: `${person.name}'s Birthday`,
          date: formData.birthday,
          type: 'birthday',
        });
      }

      // 4. Create milestone events
      for (const milestone of formData.milestones) {
        const eventTitle =
          milestone.type === 'anniversary'
            ? 'Anniversary'
            : milestone.type === 'name_day'
              ? 'Name Day'
              : milestone.type;
        await createEvent({
          personId: person.id,
          title: eventTitle,
          date: milestone.date,
          type: (milestone.type as 'anniversary' | 'name_day') || 'other',
        });
      }

      // 5. Create social accounts
      for (const account of formData.socialAccounts) {
        await createSocialAccount({
          personId: person.id,
          platform: account.platform,
          username: account.username,
          profileUrl: account.profileUrl,
          isActive: true,
        });
      }

      return { success: true, personId: person.id };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: message };
    }
  }, [formData, createPerson, upsertProfile, createEvent, createSocialAccount]);

  return (
    <AddPersonContext.Provider
      value={{ formData, updateFormData, resetForm, submitForm }}
    >
      {children}
    </AddPersonContext.Provider>
  );
}

export function useAddPerson() {
  const ctx = useContext(AddPersonContext);
  if (!ctx) {
    throw new Error('useAddPerson must be used within AddPersonProvider');
  }
  return ctx;
}
