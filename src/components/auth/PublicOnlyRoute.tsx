import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function PublicOnlyRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-life-paper text-life-ink">
        <div className="rounded-lg border border-life-line bg-white px-4 py-3 text-sm font-bold shadow-soft">Loading LifeOS...</div>
      </main>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
