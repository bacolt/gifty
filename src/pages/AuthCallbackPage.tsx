import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

/**
 * Handles the redirect after email confirmation (double opt-in).
 * Supabase redirects here with hash fragments; we exchange them for a session
 * and then send the user to the dashboard.
 */
export function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function handleCallback() {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (cancelled) return;

      if (error) {
        navigate('/login', { replace: true });
        return;
      }

      if (session) {
        navigate('/', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }

    handleCallback();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background-light flex flex-col items-center justify-center px-6">
      <p className="text-muted text-lg">Confirming your email…</p>
    </div>
  );
}
