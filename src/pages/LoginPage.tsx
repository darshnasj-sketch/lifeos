import { Chrome } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthButton } from '../components/auth/AuthButton';
import { AuthCard } from '../components/auth/AuthCard';
import { AuthInput } from '../components/auth/AuthInput';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    try {
      await signInWithEmail(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to log in.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to your quiet command center.">
      <form className="grid gap-3" onSubmit={handleSubmit}>
        <AuthInput id="email" label="Email" name="email" type="email" autoComplete="email" required />
        <AuthInput id="password" label="Password" name="password" type="password" autoComplete="current-password" required />
        {error ? <p className="rounded-lg bg-life-rose px-3 py-2 text-sm font-bold text-life-roseDeep">{error}</p> : null}
        <AuthButton type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </AuthButton>
      </form>
      <div className="my-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs font-bold text-life-muted">
        <span className="h-px bg-life-line" />
        or
        <span className="h-px bg-life-line" />
      </div>
      <AuthButton type="button" variant="secondary" onClick={() => void signInWithGoogle()}>
        <Chrome size={17} />
        Continue with Google
      </AuthButton>
      <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm font-bold">
        <Link className="text-life-mintDeep" to="/forgot-password">
          Forgot password?
        </Link>
        <Link className="text-life-mintDeep" to="/signup">
          Create account
        </Link>
      </div>
    </AuthCard>
  );
}
