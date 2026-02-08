/**
 * Database types matching Supabase schema (snake_case)
 */

export interface DatabasePerson {
  id: string;
  user_id: string;
  name: string;
  birthday: string;
  relationship?: string | null;
  avatar_url?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DatabaseProfile {
  id: string;
  person_id: string;
  interests?: string[] | null;
  likes?: string[] | null;
  gift_hints?: string[] | null;
  created_at: string;
  updated_at: string;
}

export type GiftStatusDb = 'not_planned' | 'ideas_gathered' | 'purchased';

export interface DatabaseEvent {
  id: string;
  person_id: string;
  title: string;
  date: string;
  type: 'birthday' | 'anniversary' | 'name_day' | 'other';
  status?: string | null;
  gift_status: GiftStatusDb;
  chosen_suggestion_id: string | null;
  purchased_gift_title: string | null;
  created_at: string;
  updated_at: string;
}

/** Event row when selected with joined gift_suggestions (for chosen suggestion title). */
export interface DatabaseEventRow extends DatabaseEvent {
  gift_suggestions?: { title: string } | null;
}

export interface DatabaseGiftSuggestion {
  id: string;
  person_id: string;
  title: string;
  description?: string | null;
  reason?: string | null;
  link?: string | null;
  category?: string | null;
  created_at: string;
  updated_at: string;
}

// Insert types (omit id and timestamps)
// Note: user_id is optional here because services add it automatically from auth
export type InsertPerson = Omit<
  DatabasePerson,
  'id' | 'user_id' | 'created_at' | 'updated_at'
> & {
  user_id?: string; // Added automatically by services
};

export type InsertProfile = Omit<
  DatabaseProfile,
  'id' | 'created_at' | 'updated_at'
>;

export type InsertEvent = Omit<
  DatabaseEvent,
  'id' | 'created_at' | 'updated_at' | 'gift_status' | 'chosen_suggestion_id' | 'purchased_gift_title'
> & {
  /** Optional on insert; DB default is 'not_planned'. */
  gift_status?: GiftStatusDb;
  chosen_suggestion_id?: string | null;
  purchased_gift_title?: string | null;
};

export type InsertGiftSuggestion = Omit<
  DatabaseGiftSuggestion,
  'id' | 'created_at' | 'updated_at'
>;

// Update types (all fields optional except id)
export type UpdatePerson = Partial<Omit<DatabasePerson, 'id' | 'created_at' | 'updated_at'>>;

export type UpdateProfile = Partial<Omit<DatabaseProfile, 'id' | 'person_id' | 'created_at' | 'updated_at'>>;

export type UpdateEvent = Partial<Omit<DatabaseEvent, 'id' | 'created_at' | 'updated_at'>>;

export type UpdateGiftSuggestion = Partial<
  Omit<DatabaseGiftSuggestion, 'id' | 'created_at' | 'updated_at'>
>;

export interface DatabaseSocialAccount {
  id: string;
  person_id: string;
  platform: string;
  username: string;
  profile_url: string;
  is_active: boolean;
  last_checked_at: string | null;
  created_at: string;
  updated_at: string;
}

export type InsertSocialAccount = Omit<
  DatabaseSocialAccount,
  'id' | 'last_checked_at' | 'created_at' | 'updated_at'
>;

export type UpdateSocialAccount = Partial<
  Omit<DatabaseSocialAccount, 'id' | 'person_id' | 'last_checked_at' | 'created_at' | 'updated_at'>
>;
