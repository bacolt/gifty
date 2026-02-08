import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';

/**
 * Shown after signup: "One last step..." – confirm your email.
 * No CTA button, no resend link. Email passed via location state.
 */
export function ConfirmEmailPage() {
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email ?? '';

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Header – same as rest of app (DashboardHeader) */}
      <header className="flex items-center justify-between whitespace-nowrap px-10 py-4 bg-white">
        <Link to="/landing" className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Icon name="gift" className="text-[20px]" />
          </div>
          <h2 className="text-foreground text-xl font-bold tracking-tight">
            GiftPlanner
          </h2>
        </Link>
        <Link
          to="/help"
          className="text-muted hover:text-foreground transition-colors text-sm font-medium"
        >
          Help
        </Link>
      </header>

      {/* Main content – centered card like the reference */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-border p-8 sm:p-10 text-center">
            {/* Envelope + heart icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon
                  name="envelope-heart"
                  className="text-4xl text-primary"
                />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              One last step…
            </h1>
            <p className="text-muted text-base mb-1">
              We've sent a confirmation link to your email.
            </p>
            <p className="text-muted text-base mb-6">
              Just click it to start your journey with thoughtful gifts.
            </p>

            {email && (
              <div className="inline-flex items-center gap-2 rounded-full bg-surface border border-border px-4 py-2.5 mb-2">
                <span className="text-muted text-sm">@</span>
                <span className="text-foreground font-medium text-sm">
                  {email}
                </span>
              </div>
            )}
          </div>

          <p className="text-center text-muted text-xs mt-6">
            ● CHECK YOUR SPAM FOLDER JUST IN CASE!
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-border flex flex-wrap justify-center gap-6 text-xs text-muted">
        <Link to="/privacy" className="hover:text-foreground transition-colors">
          Privacy Policy
        </Link>
        <Link to="/terms" className="hover:text-foreground transition-colors">
          Terms
        </Link>
        <Link to="/support" className="hover:text-foreground transition-colors">
          Contact Support
        </Link>
      </footer>
    </div>
  );
}
