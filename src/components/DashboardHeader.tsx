import { Link } from 'react-router-dom';

const placeholderAvatar =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDw8a_cPeg-rHOaXaNxgAYXd5QhAEJeEly0j1xy5Jae1gSS-c-3l5zRj_BpIBRYOPOlmrfwUJos8ho4YlawerRLJ_ySIrkckPPpLPj_pu85ACWTt4VoV1A9IfFIDsvncq1tptsp2ysinBVMKoPwd0LHliweUqXl5dtXrvfm8TIyXB80kbxgzguWNBytLQp5Gic3A5JP0PUkvSBkVcsVZ78fT_jlL8AKCr55b_aQMEmXbAVYAIl6Df_OCOlvCs3AO6n0-Rp1rO2jnAA';

export function DashboardHeader() {
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
            to="/people"
            className="text-[#111817] text-sm font-semibold hover:text-primary transition-colors"
          >
            My People
          </Link>
          <Link
            to="/suggestions"
            className="text-[#111817] text-sm font-semibold hover:text-primary transition-colors"
          >
            Ideas
          </Link>
          <a
            href="#"
            className="text-[#111817] text-sm font-semibold hover:text-primary transition-colors"
          >
            Orders
          </a>
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
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
            style={{ backgroundImage: `url("${placeholderAvatar}")` }}
            role="img"
            aria-label="Profile"
          />
        </div>
      </div>
    </header>
  );
}
