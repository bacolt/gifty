export interface DashboardEvent {
  id: string;
  title: string;
  dateLabel: string;
  inDaysLabel?: string;
  icon: string;
  personId?: string;
}

export interface DashboardPersonCard {
  id: string;
  name: string;
  relationship: string;
  avatarUrl: string;
  nextEventLabel: string;
  status: 'coming_soon' | 'not_started' | 'gift_ordered';
  statusLabel: string;
  likes: string[];
  buttonType: 'plan' | 'track';
  buttonLabel: string;
}

export const dashboardEvents: DashboardEvent[] = [
  {
    id: 'de1',
    title: "Sarah's Birthday",
    dateLabel: 'October 12',
    inDaysLabel: 'In 5 Days',
    icon: 'cake',
  },
  {
    id: 'de2',
    title: '10th Anniversary',
    dateLabel: 'October 28',
    icon: 'favorite',
  },
  {
    id: 'de3',
    title: "Dad's Retirement",
    dateLabel: 'November 05',
    icon: 'work',
  },
  {
    id: 'de4',
    title: "Leo's Housewarming",
    dateLabel: 'December 02',
    icon: 'home',
  },
];

export const dashboardPeople: DashboardPersonCard[] = [
  {
    id: 'dp1',
    name: 'Sarah Jenkins',
    relationship: 'Best Friend',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuASNOfHsG3dU972MoWUA9xyOGP1ZzWAHYz4pBz6P-zgxMP9ZPMlUeGON4gUG5SpdrHhGxGi5RkIsbSqsD-15Fn02LnnGPeXZHSlXY_W53uTzztvsfsLdGI5bcaEVpn1PAHbLrYxgQHhmHusV6kwfIaQ1iE-0c_jlnfqGzilWYxwNwdpKez5dPzkniIaUNbGxZw6RPFjAtNwJ6HXi2MiBj_dx1SgAEDJv6-r_NOm5-Yj2W9UvQ-RXMnTjNUXrMLmsi3fuh_tofIuxHQ',
    nextEventLabel: 'Birthday in 12 days',
    status: 'coming_soon',
    statusLabel: 'Coming soon',
    likes: ['Ceramics', 'Gardening'],
    buttonType: 'plan',
    buttonLabel: 'Plan Gift',
  },
  {
    id: 'dp2',
    name: 'Robert Chen',
    relationship: 'Father',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZDOFworMbRKV5wofro61PVpNv2_UJ1TGqoXpW_CaSJC7O2Q-r8x-qZoz3LMNjzOmrABTLLnDNraE-jLdLE8iR5coYe4UF58OBpaADraeqoCSOYkPzjD_ht1_hrehgmyKBeFgcMgOT2mCgsPMhkW9ZNPzgbnOg4sYvKsfmktG9zHqRtYC4KPZRCGGhjGLK1jPdWNOs9nlYUne34DBnCm-C3z4pEWy9GIPNCfGC8pQ_1E07QBdOgtQ8rDso1iIVbVxsUzm9jMmNWT8',
    nextEventLabel: 'Retirement in 28 days',
    status: 'not_started',
    statusLabel: 'Not started',
    likes: ['Golf', 'Whiskey'],
    buttonType: 'plan',
    buttonLabel: 'Plan Gift',
  },
  {
    id: 'dp3',
    name: 'Leo Miller',
    relationship: 'Brother',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDwgAb7ETKWnT2j820NtWqnwCCi5_Zw6uKLrqQfAapJrYKzO2oYPvtNcPxfDZoPRUUQ5LZWiepTBUn_YRicvRkcoCB7q5YR61hy3v8CJFt51SHWvzOEDcDSnG0JxfRiK71-pDxoT0OplN_AoQTUdZMpzhXptFke7OJu8KgMCJIckLUFQ88_QZwEJV65unWJCxjYvDuGbB9ZFTBIEE9IskjKjZwjXy7xEPSZTvgm6kbj0ajVkBE0e3e3vqiJjKyTxsecPUktMsLuRCI',
    nextEventLabel: 'Housewarming in 45 days',
    status: 'gift_ordered',
    statusLabel: 'Gift Ordered',
    likes: ['Interior Design'],
    buttonType: 'track',
    buttonLabel: 'Track Gift',
  },
];
