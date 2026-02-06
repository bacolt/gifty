import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const placeholderAvatar =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDw8a_cPeg-rHOaXaNxgAYXd5QhAEJeEly0j1xy5Jae1gSS-c-3l5zRj_BpIBRYOPOlmrfwUJos8ho4YlawerRLJ_ySIrkckPPpLPj_pu85ACWTt4VoV1A9IfFIDsvncq1tptsp2ysinBVMKoPwd0LHliweUqXl5dtXrvfm8TIyXB80kbxgzguWNBytLQp5Gic3A5JP0PUkvSBkVcsVZ78fT_jlL8AKCr55b_aQMEmXbAVYAIl6Df_OCOlvCs3AO6n0-Rp1rO2jnAA';

export function DashboardHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showDropdown]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/landing', { replace: true });
  };

  const userEmail = user?.email || 'User';
  const userInitials = userEmail
    .split('@')[0]
    .split('.')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] px-10 py-4 bg-white">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[20px]">
              card_giftcard
            </span>
          </div>
          <h2 className="text-[#111817] text-xl font-bold tracking-tight">
            GiftPlanner
          </h2>
        </Link>
        <div className="hidden md:flex flex-1 items-stretch rounded-xl h-10 w-64">
          <div className="text-[#638885] flex border-none bg-[#f0f4f4] items-center justify-center pl-4 rounded-l-xl">
            <span className="material-symbols-outlined text-sm">search</span>
          </div>
          <input
            type="search"
            className="flex w-full min-w-0 flex-1 border-none bg-[#f0f4f4] focus:outline-0 focus:ring-0 h-full placeholder:text-[#638885] px-4 rounded-r-xl text-sm font-normal"
            placeholder="Find someone..."
            aria-label="Search people"
          />
        </div>
      </div>
      <div className="flex items-center gap-8">
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            to="/"
            className="text-[#111817] text-sm font-semibold hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/people"
            className="text-[#111817] text-sm font-semibold hover:text-primary transition-colors"
          >
            Connections
          </Link>
          <Link
            to="/calendar"
            className="text-[#111817] text-sm font-semibold hover:text-primary transition-colors"
          >
            Calendar
          </Link>
        </nav>
        <div className="flex gap-3">
          <button
            type="button"
            className="flex items-center justify-center rounded-full h-10 w-10 bg-[#f0f4f4] text-[#111817]"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">
              notifications
            </span>
          </button>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-center rounded-full size-10 border-2 border-primary/20 bg-gradient-to-br from-primary/20 to-primary/10 text-[#111817] font-semibold text-sm hover:opacity-80 transition-opacity"
              aria-label="Profile menu"
            >
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt={userEmail}
                  className="rounded-full size-full object-cover"
                />
              ) : (
                userInitials
              )}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#e5e7eb] py-2 z-50">
                <div className="px-4 py-2 border-b border-[#e5e7eb]">
                  <p className="text-sm font-semibold text-[#111817] truncate">
                    {userEmail}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-[#111817] hover:bg-[#f0f4f4] transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">
                    logout
                  </span>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
