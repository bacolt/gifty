export interface Person {
  id: string;
  name: string;
  birthday: string;
  relationship?: string;
  avatarUrl?: string;
  notes?: string;
  profileId?: string;
}

export interface Event {
  id: string;
  personId: string;
  title: string;
  date: string;
  type: 'birthday' | 'anniversary' | 'other';
  status?: string;
}

export interface Profile {
  id: string;
  personId: string;
  interests?: string[];
  likes?: string[];
  giftHints?: string[];
}

export interface GiftSuggestion {
  id: string;
  personId: string;
  title: string;
  description: string;
  reason: string;
  link?: string;
  category?: string;
}
