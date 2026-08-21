import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AppShell, ErrorState, LoadingState } from '@/components/ui';
import { useAppContext } from '@/contexts/AppContext';
import { AuthProvider } from '@/contexts/AuthContext';
import AuthCallbackPage from '@/pages/AuthCallbackPage';
import CycleDetailPage from '@/pages/CycleDetailPage';
import DashboardPage from '@/pages/DashboardPage';
import DataDeletionPage from '@/pages/DataDeletionPage';
import EmailConfirmationPage from '@/pages/EmailConfirmationPage';
import HistoryPage from '@/pages/HistoryPage';
import LoginPage from '@/pages/LoginPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import SettingsPage from '@/pages/SettingsPage';
import SetupPage from '@/pages/SetupPage';
import SituationsPage from '@/pages/SituationsPage';
import StatsPage from '@/pages/StatsPage';
import UpdatePasswordPage from '@/pages/UpdatePasswordPage';

function ProtectedLayout() {
  const { profile, loading, error } = useAppContext();
  const location = useLocation();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!profile && location.pathname !== '/setup') {
    return <Navigate to="/setup" replace />;
  }

  if (profile && location.pathname === '/setup') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

function RoutedApp() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/update-password" element={<UpdatePasswordPage />} />
      <Route path="/confirm-email" element={<EmailConfirmationPage />} />
      <Route path="/data-deletion" element={<DataDeletionPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      
      {/* Protected routes */}
      <Route path="/setup" element={<ProtectedRoute><SetupPage /></ProtectedRoute>} />
      <Route element={<ProtectedRoute><ProtectedLayout /></ProtectedRoute>}>
        <Route path="/" element={<AppShell><DashboardPage /></AppShell>} />
        <Route path="/situations" element={<AppShell><SituationsPage /></AppShell>} />
        <Route path="/history" element={<AppShell><HistoryPage /></AppShell>} />
        <Route path="/history/:id" element={<AppShell><CycleDetailPage /></AppShell>} />
        <Route path="/settings" element={<AppShell><SettingsPage /></AppShell>} />
        <Route path="/stats" element={<AppShell><StatsPage /></AppShell>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RoutedApp />
      </AuthProvider>
    </ErrorBoundary>
  );
}
