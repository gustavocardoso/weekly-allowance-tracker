import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, Plus, History, Settings } from 'lucide-react';

export function MobileNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-foreground text-background rounded-full p-2 flex justify-around items-center ring-1 ring-white/10 shadow-2xl z-50">
      <Link
        to="/"
        className={`p-3 rounded-full transition-colors ${
          isActive('/') ? 'bg-background/10' : 'text-background/40 hover:text-background/80'
        }`}
        aria-label="Home"
      >
        <Home className="size-5" />
      </Link>

      <Link
        to="/stats"
        className={`p-3 rounded-full transition-colors ${
          isActive('/stats') ? 'bg-background/10' : 'text-background/40 hover:text-background/80'
        }`}
        aria-label="Stats"
      >
        <BarChart3 className="size-5" />
      </Link>

      <button
        className="size-12 rounded-full bg-background text-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        aria-label="Quick add entry"
      >
        <Plus className="size-5" />
      </button>

      <Link
        to="/history"
        className={`p-3 rounded-full transition-colors ${
          isActive('/history') ? 'bg-background/10' : 'text-background/40 hover:text-background/80'
        }`}
        aria-label="History"
      >
        <History className="size-5" />
      </Link>

      <Link
        to="/settings"
        className={`p-3 rounded-full transition-colors ${
          isActive('/settings') ? 'bg-background/10' : 'text-background/40 hover:text-background/80'
        }`}
        aria-label="Settings"
      >
        <Settings className="size-5" />
      </Link>
    </div>
  );
}
