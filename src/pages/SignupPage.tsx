import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@/components/ui/Icon';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function SignupPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    const result = await signUp(email, password);
    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      // Success – show confirm-email page (no CTA, no resend)
      navigate('/confirm-email', { replace: true, state: { email } });
    }
  };

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-foreground">Gifty</div>
        <Link
          to="/help"
          className="text-muted hover:text-foreground transition-colors text-sm font-medium"
        >
          Help
        </Link>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Create your account
          </h1>
          <p className="text-lg text-muted mb-8">
            Start planning thoughtful gifts today.
          </p>

          <form onSubmit={handleSignUp} className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={error && !error.includes('Password') ? error : undefined}
              className="pl-12"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23638885' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'/%3E%3Cpolyline points='22,6 12,13 2,6'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '12px center',
              }}
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={error && error.includes('Password') ? error : undefined}
                className="pl-12 pr-12"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23638885' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '12px center',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
              >
<Icon
                name={showPassword ? 'eye-slash' : 'eye'}
                className="text-xl"
              />
              </button>
            </div>

            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                error={error && error.includes('match') ? error : undefined}
                className="pl-12 pr-12"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23638885' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '12px center',
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
              >
<Icon
                name={showConfirmPassword ? 'eye-slash' : 'eye'}
                className="text-xl"
              />
              </button>
            </div>

            {error && !error.includes('Password') && !error.includes('match') && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              className="py-3 text-base"
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-bold text-muted uppercase tracking-wider">
              OR CONTINUE WITH
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social login buttons (disabled for now) */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              disabled
              className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg bg-white text-foreground font-medium hover:bg-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-xl">G</span>
              Google
            </button>
            <button
              type="button"
              disabled
              className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg bg-white text-foreground font-medium hover:bg-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-xl">🍎</span>
              Apple
            </button>
          </div>

          {/* Sign in link */}
          <p className="text-center text-muted text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:opacity-80">
              Sign in
            </Link>
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
