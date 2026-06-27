import { Chrome } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthButton } from '../components/auth/AuthButton';
import { AuthCard } from '../components/auth/AuthCard';
import { AuthInput } from '../components/auth/AuthInput';
import { useAuth } from '../hooks/useAuth';

export function SignUpPage() {
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get('fullName'));
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    try {
      await signUpWithEmail(fullName, email, password);
      setMessage('Account created. Check your email if confirmation is enabled.');
      navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Create LifeOS" subtitle="Start with the basics. Your dashboard comes next.">
      <form className="grid gap-3" onSubmit={handleSubmit}>
        <AuthInput id="fullName" label="Full name" name="fullName" autoComplete="name" required />
        <AuthInput id="email" label="Email" name="email" type="email" autoComplete="email" required />
        <AuthInput id="password" label="Password" name="password" type="password" autoComplete="new-password" minLength={6} required />
        {error ? <p className="rounded-lg bg-life-rose px-3 py-2 text-sm font-bold text-life-roseDeep">{error}</p> : null}
        {message ? <p className="rounded-lg bg-life-mint px-3 py-2 text-sm font-bold text-life-mintDeep">{message}</p> : null}
        <AuthButton type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up'}
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
      <p className="mt-5 text-sm font-bold text-life-muted">
        Already have an account?{' '}
        <Link className="text-life-mintDeep" to="/login">
          Login
        </Link>
      </p>
    </AuthCard>
  );
}
