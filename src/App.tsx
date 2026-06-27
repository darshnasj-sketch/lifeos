import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PublicOnlyRoute } from './components/auth/PublicOnlyRoute';
import { DashboardPage } from './pages/DashboardPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { LoginPage } from './pages/LoginPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { SignUpPage } from './pages/SignUpPage';

export function App() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardPage />} />
        <Route
          path="/money"
          element={<PlaceholderPage title="Money" description="Budgets, expenses, bills, and monthly trends will live here." />}
        />
        <Route
          path="/pantry"
          element={<PlaceholderPage title="Pantry" description="Your grocery list, inventory, low-stock alerts, and meal planning will live here." />}
        />
        <Route
          path="/journal"
          element={<PlaceholderPage title="Journal" description="Daily reflections, notes, memories, and personal check-ins will live here." />}
        />
        <Route
          path="/ai"
          element={<PlaceholderPage title="AI" description="Your LifeOS assistant, summaries, and smart suggestions will live here." />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
