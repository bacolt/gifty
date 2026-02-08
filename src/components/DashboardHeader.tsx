import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@/components/ui/Icon';

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
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border px-10 py-4 bg-white">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Icon name="gift" className="text-[20px]" />
          </div>
          <h2 className="text-foreground text-xl font-bold tracking-tight">
            GiftPlanner
          </h2>
        </Link>
        <div className="hidden md:flex flex-1 items-stretch rounded-xl h-10 w-64">
          <div className="text-muted flex border-none bg-surface items-center justify-center pl-4 rounded-l-xl">
            <Icon name="search" className="text-sm" />
          </div>
          <input
            type="search"
            className="flex w-full min-w-0 flex-1 border-none bg-surface focus:outline-0 focus:ring-0 h-full placeholder:text-muted px-4 rounded-r-xl text-sm font-normal"
            placeholder="Find someone..."
            aria-label="Search people"
          />
        </div>
      </div>
      <div className="flex items-center gap-8">
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            to="/people"
            className="text-foreground text-sm font-semibold hover:text-primary transition-colors"
          >
            My People
          </Link>
          <Link
            to="/calendar"
            className="text-foreground text-sm font-semibold hover:text-primary transition-colors"
          >
            Calendar
          </Link>
        </nav>
        <div className="flex gap-3">
          <button
            type="button"
            className="flex items-center justify-center rounded-full h-10 w-10 bg-surface text-foreground"
            aria-label="Notifications"
          >
            <Icon name="bell" className="text-[20px]" />
          </button>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-center rounded-full size-10 border-2 border-primary/20 bg-gradient-to-br from-primary/20 to-primary/10 text-foreground font-semibold text-sm hover:opacity-80 transition-opacity"
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
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-2 z-50">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {userEmail}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-surface transition-colors flex items-center gap-2"
                >
                  <Icon name="box-arrow-right" className="text-lg" />
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
