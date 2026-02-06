import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';

interface PersonCardProps {
  to: string;
  name: string;
  relationship?: string;
  avatarUrl?: string;
  nextEventLabel?: string;
  status?: 'coming_soon' | 'not_started' | 'gift_ordered';
  statusLabel?: string;
  likes?: string[];
  buttonLabel: string;
  buttonIcon: string;
}

export function PersonCard({
  to,
  name,
  relationship,
  avatarUrl,
  nextEventLabel,
  status = 'not_started',
  statusLabel = 'Not started',
  likes = [],
  buttonLabel,
  buttonIcon,
}: PersonCardProps) {
  const placeholderAvatar =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDw8a_cPeg-rHOaXaNxgAYXd5QhAEJeEly0j1xy5Jae1gSS-c-3l5zRj_BpIBRYOPOlmrfwUJos8ho4YlawerRLJ_ySIrkckPPpLPj_pu85ACWTt4VoV1A9IfFIDsvncq1tptsp2ysinBVMKoPwd0LHliweUqXl5dtXrvfm8TIyXB80kbxgzguWNBytLQp5Gic3A5JP0PUkvSBkVcsVZ78fT_jlL8AKCr55b_aQMEmXbAVYAIl6Df_OCOlvCs3AO6n0-Rp1rO2jnAA';

  const statusClasses =
    status === 'coming_soon'
      ? 'text-primary bg-primary/10'
      : status === 'gift_ordered'
        ? 'text-green-600 bg-green-100'
        : 'text-[#638885] bg-gray-100';

  return (
    <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className="size-14 rounded-full bg-center bg-cover border-2 border-white shadow-sm flex-shrink-0"
            style={{
              backgroundImage: `url("${avatarUrl || placeholderAvatar}")`,
            }}
            role="img"
            aria-label={name}
          />
          <div>
            <h3 className="text-lg font-bold text-[#111817]">{name}</h3>
            {relationship && (
              <p className="text-[#638885] text-sm">{relationship}</p>
            )}
          </div>
        </div>
        <button
          type="button"
          className="text-[#638885] hover:text-primary transition-colors p-1"
          aria-label="More options"
        >
          <Icon name="three-dots" />
        </button>
      </div>
      <div className="bg-[#f8fafa] rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-[#638885] uppercase tracking-wider">
            Next Event
          </p>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusClasses}`}
          >
            {statusLabel}
          </span>
        </div>
        {nextEventLabel ? (
          <p className="text-sm font-bold text-[#111817]">{nextEventLabel}</p>
        ) : (
          <p className="text-sm text-[#638885]">
            No upcoming events yet. Add a birthday or milestone to get started.
          </p>
        )}
        {likes.length > 0 && (
          <div className="mt-3 flex gap-2 flex-wrap">
            {likes.map((like) => (
              <span
                key={like}
                className="text-[10px] bg-white px-2 py-1 rounded border border-[#e5e7eb] text-[#638885]"
              >
                Likes: {like}
              </span>
            ))}
          </div>
        )}
      </div>
      <Link
        to={to}
        className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 block text-center"
      >
        <Icon name={buttonIcon} className="text-[18px]" />
        {buttonLabel}
      </Link>
    </div>
  );
}

