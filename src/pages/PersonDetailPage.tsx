import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { usePerson } from '@/hooks/usePeople';
import { useProfile } from '@/hooks/useProfiles';
import { useEventsByPerson } from '@/hooks/useEvents';
import { useSocialAccountsByPerson } from '@/hooks/useSocialAccounts';
import { formatDate } from '@/utils/formatDate';

function formatDaysUntil(dateStr: string): string | null {
  const today = new Date();
  const target = new Date(dateStr);
  // Strip time for both
  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const end = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );
  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (Number.isNaN(diffDays)) return null;
  if (diffDays < 0) return null;
  if (diffDays === 0) return 'TODAY';
  if (diffDays === 1) return 'IN 1 DAY';
  return `IN ${diffDays} DAYS`;
}

export function PersonDetailPage() {
  const { personId } = useParams<{ personId: string }>();

  const {
    person,
    loading: personLoading,
    error: personError,
  } = usePerson(personId || '');
  const {
    profile,
    loading: profileLoading,
  } = useProfile(personId || '');
  const {
    events,
    loading: eventsLoading,
  } = useEventsByPerson(personId || '');
  const {
    accounts,
    loading: socialLoading,
  } = useSocialAccountsByPerson(personId || '');

  const birthdayEvent = useMemo(
    () => events.find((e) => e.type === 'birthday'),
    [events]
  );

  const otherEvents = useMemo(
    () => events.filter((e) => e.type !== 'birthday'),
    [events]
  );

  if (!personId) {
    return (
      <div className="text-center text-[#638885] py-16">
        Person not found.
      </div>
    );
  }

  if (personLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-[#638885]">Loading person…</p>
        </div>
      </div>
    );
  }

  if (personError || !person) {
    return (
      <div className="text-center text-[#638885] py-16">
        Unable to load this person.
      </div>
    );
  }

  const initials =
    person.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'P';

  const primaryAccounts = accounts.filter((a) =>
    ['instagram', 'tiktok', 'linkedin', 'facebook']
      .map((p) => p.toLowerCase())
      .includes(a.platform.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header card */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            {person.avatarUrl ? (
              <img
                src={person.avatarUrl}
                alt={person.name}
                className="h-16 w-16 rounded-2xl object-cover"
              />
            ) : (
              <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
                {initials}
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-[#111817]">
                {person.name}
              </h1>
              {person.relationship && (
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                  {person.relationship.replace('_', ' ')}
                </span>
              )}
            </div>
            {birthdayEvent && (
              <p className="text-sm text-[#638885]">
                Birthday {formatDate(birthdayEvent.date)}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/people"
            className="px-4 py-2 rounded-lg border border-[#e5e7eb] text-sm font-semibold text-[#111817] hover:bg-[#f0f4f4]"
          >
            Back to People
          </Link>
          <Link
            to="/suggestions"
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 flex items-center gap-2"
          >
            <Icon name="lightbulb" className="text-[18px]" />
            View Gift Ideas
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
        {/* Left column: Interests + Important Dates */}
        <div className="space-y-6">
          {/* Interests */}
          <section className="bg-white rounded-2xl border border-[#e5e7eb] p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[#111817] uppercase tracking-wider">
                Interests
              </h2>
            </div>
            {profileLoading ? (
              <p className="text-sm text-[#638885]">Loading interests…</p>
            ) : profile?.interests && profile.interests.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 rounded-full bg-[#f0f4f4] text-[#111817] text-xs font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#638885]">
                No interests added yet. You can add some when editing their
                profile.
              </p>
            )}
          </section>

          {/* Important Dates */}
          <section className="bg-white rounded-2xl border border-[#e5e7eb] p-5">
            <h2 className="text-sm font-bold text-[#111817] uppercase tracking-wider mb-3">
              Important Dates
            </h2>
            {eventsLoading ? (
              <p className="text-sm text-[#638885]">Loading events…</p>
            ) : events.length === 0 ? (
              <p className="text-sm text-[#638885]">
                No important dates yet. Add birthdays or milestones from the
                calendar step.
              </p>
            ) : (
              <div className="space-y-3">
                {birthdayEvent && (
                  <div className="flex items-center justify-between rounded-xl bg-primary/5 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-[#111817]">
                        Birthday
                      </p>
                      <p className="text-xs text-[#638885]">
                        {formatDate(birthdayEvent.date)}
                      </p>
                    </div>
                    {formatDaysUntil(birthdayEvent.date) && (
                      <span className="text-[11px] font-bold text-primary px-3 py-1 rounded-full bg-primary/10 uppercase tracking-wider">
                        {formatDaysUntil(birthdayEvent.date)}
                      </span>
                    )}
                  </div>
                )}
                {otherEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between rounded-xl border border-[#e5e7eb] px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#111817]">
                        {event.title}
                      </p>
                      <p className="text-xs text-[#638885]">
                        {formatDate(event.date)}
                      </p>
                    </div>
                    {formatDaysUntil(event.date) && (
                      <span className="text-[11px] font-bold text-primary px-3 py-1 rounded-full bg-primary/10 uppercase tracking-wider">
                        {formatDaysUntil(event.date)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right column: Notes */}
        <section className="bg-white rounded-2xl border border-[#e5e7eb] p-5 flex flex-col min-h-[260px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-[#111817] uppercase tracking-wider">
              Personal Notes &amp; Musings
            </h2>
          </div>
          {person.notes ? (
            <p className="text-sm text-[#111817] leading-relaxed whitespace-pre-line">
              {person.notes}
            </p>
          ) : (
            <p className="text-sm text-[#638885]">
              You haven&apos;t added any notes for {person.name} yet. Use this
              space to capture preferences, sizes, or ideas you don&apos;t want
              to forget.
            </p>
          )}
        </section>
      </div>

      {/* Bottom: social links */}
      <section className="bg-white rounded-2xl border border-[#e5e7eb] p-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-[#638885]">
          CONNECT:
        </p>
        {socialLoading ? (
          <p className="text-xs text-[#638885]">Loading social accounts…</p>
        ) : primaryAccounts.length === 0 ? (
          <p className="text-xs text-[#638885]">
            No social accounts added yet.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {primaryAccounts.map((account) => (
              <a
                key={account.id}
                href={account.profileUrl || '#'}
                target={account.profileUrl ? '_blank' : undefined}
                rel={account.profileUrl ? 'noreferrer' : undefined}
                className="px-4 py-1.5 rounded-full border border-[#e5e7eb] text-xs font-semibold text-[#111817] hover:bg-[#f0f4f4] transition-colors"
              >
                {account.platform}
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

