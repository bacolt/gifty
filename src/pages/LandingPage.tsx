import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function LandingPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/', { replace: true });
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5fbfb] to-white flex flex-col">
      {/* Top nav */}
      <header className="max-w-[1120px] w-full mx-auto px-6 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined text-[20px]">
              card_giftcard
            </span>
          </div>
          <span className="text-[#111817] font-bold text-lg tracking-tight">
            GiftPlanner
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-semibold text-[#111817] hover:text-primary transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-full bg-primary text-white text-sm font-bold shadow-lg shadow-primary/40 hover:opacity-90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col">
        <section className="flex-1 flex items-center justify-center">
          <div className="max-w-[1120px] w-full mx-auto px-6 py-12 text-center flex flex-col md:flex-row md:items-center md:justify-center gap-10">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111817] leading-tight mb-4">
                Give with{' '}
                <span className="text-primary italic">intention</span>,<br />
                not effort.
              </h1>
              <p className="text-base md:text-lg text-[#638885] mb-8 max-w-md mx-auto">
                A personal assistant for your most thoughtful moments. Tailored
                planning for people who care.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-bold text-sm shadow-lg shadow-primary/40 hover:opacity-90 transition-colors"
                >
                  Get Started
                  <span className="material-symbols-outlined text-[18px] ml-1">
                    arrow_forward
                  </span>
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border border-[#e5e7eb] text-sm font-semibold text-[#111817] hover:bg-[#f0f4f4] transition-colors"
                >
                  How it works
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How it works / features */}
        <section
          id="how-it-works"
          className="border-t border-[#e5e7eb] bg-white/60"
        >
          <div className="max-w-[1120px] w-full mx-auto px-6 py-10 grid gap-10 md:grid-cols-3 text-center md:text-left">
            <div className="space-y-3">
              <div className="inline-flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                <span className="material-symbols-outlined text-[20px]">
                  auto_awesome
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#111817] uppercase tracking-wider">
                Curated Choices
              </h3>
              <p className="text-sm text-[#638885]">
                Bespoke selections based on unique personality profiles and
                values.
              </p>
            </div>
            <div className="space-y-3">
              <div className="inline-flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                <span className="material-symbols-outlined text-[20px]">
                  schedule
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#111817] uppercase tracking-wider">
                Effortless Timing
              </h3>
              <p className="text-sm text-[#638885]">
                Never miss a milestone with intelligent scheduling and
                reminders.
              </p>
            </div>
            <div className="space-y-3">
              <div className="inline-flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                <span className="material-symbols-outlined text-[20px]">
                  favorite
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#111817] uppercase tracking-wider">
                Emotional Connection
              </h3>
              <p className="text-sm text-[#638885]">
                Focus on the joy of giving, while we handle the logistics of
                finding.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#e5e7eb] py-6">
        <div className="max-w-[1120px] w-full mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#638885]">
          <p>© 2026 GiftyPlanner — Handcrafted for meaningful giving.</p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="hover:text-[#111817] transition-colors uppercase tracking-wide"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="hover:text-[#111817] transition-colors uppercase tracking-wide"
            >
              Terms
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#111817] transition-colors uppercase tracking-wide"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
