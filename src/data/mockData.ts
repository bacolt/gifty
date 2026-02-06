import type { Person, Event, Profile, GiftSuggestion } from '@/types';

export const mockPeople: Person[] = [
  { id: '1', name: 'Alice', birthday: '1990-03-15', notes: 'Loves gardening', profileId: 'p1' },
  { id: '2', name: 'Bob', birthday: '1985-07-22', notes: 'Tech enthusiast', profileId: 'p2' },
  { id: '3', name: 'Carol', birthday: '1992-11-08', profileId: 'p3' },
];

export const mockEvents: Event[] = [
  { id: 'e1', personId: '1', title: "Alice's Birthday", date: '2025-03-15', type: 'birthday' },
  { id: 'e2', personId: '2', title: "Bob's Birthday", date: '2025-07-22', type: 'birthday' },
  { id: 'e3', personId: '1', title: 'Anniversary', date: '2025-06-10', type: 'anniversary' },
];

export const mockProfiles: Profile[] = [
  { id: 'p1', personId: '1', interests: ['gardening', 'books'], likes: ['tea', 'flowers'], giftHints: ['plant seeds', 'novel'] },
  { id: 'p2', personId: '2', interests: ['gadgets', 'coding'], likes: ['coffee'], giftHints: ['mechanical keyboard'] },
  { id: 'p3', personId: '3', interests: ['yoga', 'cooking'], giftHints: ['cookbook'] },
];

export const mockGiftSuggestions: GiftSuggestion[] = [
  {
    id: 'g1',
    personId: '1',
    title: 'Starter seed kit',
    description: 'Organic vegetable and herb seeds for the garden.',
    reason: 'Matches interest in gardening.',
    category: 'gardening',
  },
  {
    id: 'g2',
    personId: '1',
    title: 'Tea sampler set',
    description: 'Assorted herbal and green teas.',
    reason: 'Likes tea.',
    category: 'food',
  },
  {
    id: 'g3',
    personId: '2',
    title: 'Mechanical keyboard',
    description: 'RGB mechanical keyboard for coding.',
    reason: 'Tech enthusiast; matches gift hints.',
    category: 'tech',
  },
];
