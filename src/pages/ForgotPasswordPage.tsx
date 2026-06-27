import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AuthButton } from '../components/auth/AuthButton';
import { AuthCard } from '../components/auth/AuthCard';
import { AuthInput } from '../components/auth/AuthInput';
import { useAuth } from '../hooks/useAuth';

export function ForgotPasswordPage() {
  const { sendPasswordReset } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email'));

    try {
      await sendPasswordReset(email);
      setMessage('Password reset email sent.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send reset email.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Reset password" subtitle="We will send a recovery link to your inbox.">
      <form className="grid gap-3" onSubmit={handleSubmit}>
        <AuthInput id="email" label="Email" name="email" type="email" autoComplete="email" required />
        {error ? <p className="rounded-lg bg-life-rose px-3 py-2 text-sm font-bold text-life-roseDeep">{error}</p> : null}
        {message ? <p className="rounded-lg bg-life-mint px-3 py-2 text-sm font-bold text-life-mintDeep">{message}</p> : null}
        <AuthButton type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send reset link'}
        </AuthButton>
      </form>
      <p className="mt-5 text-sm font-bold text-life-muted">
        Remembered it?{' '}
        <Link className="text-life-mintDeep" to="/login">
          Login
        </Link>
      </p>
    </AuthCard>
  );
}
