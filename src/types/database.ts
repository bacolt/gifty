/**
 * Database types matching Supabase schema (snake_case)
 */

export interface DatabasePerson {
  id: string;
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

export interface DatabaseEvent {
  id: string;
  person_id: string;
  title: string;
  date: string;
  type: 'birthday' | 'anniversary' | 'other';
  status?: string | null;
  created_at: string;
  updated_at: string;
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
export type InsertPerson = Omit<
  DatabasePerson,
  'id' | 'created_at' | 'updated_at'
>;

export type InsertProfile = Omit<
  DatabaseProfile,
  'id' | 'created_at' | 'updated_at'
>;

export type InsertEvent = Omit<
  DatabaseEvent,
  'id' | 'created_at' | 'updated_at'
>;

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
