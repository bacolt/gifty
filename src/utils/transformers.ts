/**
 * Transformers for converting between database (snake_case) and app (camelCase) types
 */

import type {
  DatabasePerson,
  DatabaseProfile,
  DatabaseEvent,
  DatabaseGiftSuggestion,
  DatabaseSocialAccount,
  InsertPerson,
  InsertProfile,
  InsertEvent,
  InsertGiftSuggestion,
  InsertSocialAccount,
} from '@/types/database';
import type {
  Person,
  Profile,
  Event,
  GiftSuggestion,
  SocialAccount,
} from '@/types';

// Database → App
export function toPerson(dbPerson: DatabasePerson): Person {
  return {
    id: dbPerson.id,
    name: dbPerson.name,
    birthday: dbPerson.birthday,
    relationship: dbPerson.relationship ?? undefined,
    avatarUrl: dbPerson.avatar_url ?? undefined,
    notes: dbPerson.notes ?? undefined,
  };
}

export function toProfile(dbProfile: DatabaseProfile): Profile {
  return {
    id: dbProfile.id,
    personId: dbProfile.person_id,
    interests: dbProfile.interests ?? undefined,
    likes: dbProfile.likes ?? undefined,
    giftHints: dbProfile.gift_hints ?? undefined,
  };
}

export function toEvent(dbEvent: DatabaseEvent): Event {
  return {
    id: dbEvent.id,
    personId: dbEvent.person_id,
    title: dbEvent.title,
    date: dbEvent.date,
    type: dbEvent.type,
    status: dbEvent.status ?? undefined,
  };
}

export function toGiftSuggestion(
  dbSuggestion: DatabaseGiftSuggestion
): GiftSuggestion {
  return {
    id: dbSuggestion.id,
    personId: dbSuggestion.person_id,
    title: dbSuggestion.title,
    description: dbSuggestion.description ?? '',
    reason: dbSuggestion.reason ?? '',
    link: dbSuggestion.link ?? undefined,
    category: dbSuggestion.category ?? undefined,
  };
}

// App → Database (for inserts/updates)
export function fromPerson(
  person: Partial<Person>
): Partial<InsertPerson> {
  const result: Partial<InsertPerson> = {};
  if (person.name !== undefined) result.name = person.name;
  if (person.birthday !== undefined) result.birthday = person.birthday;
  if (person.relationship !== undefined)
    result.relationship = person.relationship ?? null;
  if (person.avatarUrl !== undefined)
    result.avatar_url = person.avatarUrl ?? null;
  if (person.notes !== undefined) result.notes = person.notes ?? null;
  return result;
}

export function fromProfile(
  profile: Partial<Profile>
): Partial<InsertProfile> {
  const result: Partial<InsertProfile> = {};
  if (profile.personId !== undefined) result.person_id = profile.personId;
  if (profile.interests !== undefined)
    result.interests = profile.interests ?? null;
  if (profile.likes !== undefined) result.likes = profile.likes ?? null;
  if (profile.giftHints !== undefined)
    result.gift_hints = profile.giftHints ?? null;
  return result;
}

export function fromEvent(event: Partial<Event>): Partial<InsertEvent> {
  const result: Partial<InsertEvent> = {};
  if (event.personId !== undefined) result.person_id = event.personId;
  if (event.title !== undefined) result.title = event.title;
  if (event.date !== undefined) result.date = event.date;
  if (event.type !== undefined) result.type = event.type;
  if (event.status !== undefined) result.status = event.status ?? null;
  return result;
}

export function fromGiftSuggestion(
  suggestion: Partial<GiftSuggestion>
): Partial<InsertGiftSuggestion> {
  const result: Partial<InsertGiftSuggestion> = {};
  if (suggestion.personId !== undefined)
    result.person_id = suggestion.personId;
  if (suggestion.title !== undefined) result.title = suggestion.title;
  if (suggestion.description !== undefined)
    result.description = suggestion.description ?? null;
  if (suggestion.reason !== undefined)
    result.reason = suggestion.reason ?? null;
  if (suggestion.link !== undefined) result.link = suggestion.link ?? null;
  if (suggestion.category !== undefined)
    result.category = suggestion.category ?? null;
  return result;
}

export function toSocialAccount(
  dbAccount: DatabaseSocialAccount
): SocialAccount {
  return {
    id: dbAccount.id,
    personId: dbAccount.person_id,
    platform: dbAccount.platform,
    username: dbAccount.username,
    profileUrl: dbAccount.profile_url,
    isActive: dbAccount.is_active,
    lastCheckedAt: dbAccount.last_checked_at ?? undefined,
  };
}

export function fromSocialAccount(
  account: Partial<SocialAccount>
): Partial<InsertSocialAccount> {
  const result: Partial<InsertSocialAccount> = {};
  if (account.personId !== undefined) result.person_id = account.personId;
  if (account.platform !== undefined) result.platform = account.platform;
  if (account.username !== undefined) result.username = account.username;
  if (account.profileUrl !== undefined)
    result.profile_url = account.profileUrl;
  if (account.isActive !== undefined) result.is_active = account.isActive;
  return result;
}
