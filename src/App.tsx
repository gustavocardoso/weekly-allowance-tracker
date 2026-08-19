import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppShell, ErrorState, LoadingState } from '@/components/ui';
import { useAppContext } from '@/contexts/AppContext';
import CycleDetailPage from '@/pages/CycleDetailPage';
import DashboardPage from '@/pages/DashboardPage';
import HistoryPage from '@/pages/HistoryPage';
import SettingsPage from '@/pages/SettingsPage';
import SetupPage from '@/pages/SetupPage';
import SituationsPage from '@/pages/SituationsPage';
import StatsPage from '@/pages/StatsPage';

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
      <Route path="/setup" element={<SetupPage />} />
      <Route element={<ProtectedLayout />}>
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
      <RoutedApp />
    </ErrorBoundary>
  );
}
