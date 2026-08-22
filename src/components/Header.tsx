import { Link, useLocation } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';

export function Header() {
  const { profile } = useProfile();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="Pocket Parade logo"
            className="size-16 rounded-2xl bg-primary/10 object-contain p-1"
            width={64}
            height={64}
          />
          <span className="font-extrabold tracking-tight text-2xl uppercase">Pocket</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm text-foreground">
          <Link 
            to="/" 
            className={`hover:opacity-60 transition-opacity ${location.pathname === '/' ? 'font-semibold' : 'font-normal'}`}
            aria-label="Dashboard"
          >
            Dashboard
          </Link>
          <Link 
            to="/vault" 
            className={`hover:opacity-60 transition-opacity ${location.pathname === '/vault' ? 'font-semibold' : 'font-normal'}`}
            aria-label="Vault"
          >
            Vault
          </Link>
          <Link 
            to="/history" 
            className={`hover:opacity-60 transition-opacity ${location.pathname === '/history' ? 'font-semibold' : 'font-normal'}`}
            aria-label="History"
          >
            History
          </Link>
          <Link 
            to="/settings" 
            className={`hover:opacity-60 transition-opacity ${location.pathname === '/settings' ? 'font-semibold' : 'font-normal'}`}
            aria-label="Settings"
          >
            Settings
          </Link>
        </div>

        {/* User Info */}
        {profile && (
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-foreground">{profile.childName}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {profile.childEmoji}
              </p>
            </div>
            <div className="relative">
              <div className="size-12 rounded-full ring-[3px] ring-primary/40 bg-primary/10 flex items-center justify-center text-2xl">
                {profile.childEmoji}
              </div>
              <span 
                className="absolute -bottom-0.5 -right-0.5 size-3.5 bg-accent rounded-full ring-[3px] ring-background" 
                aria-label="Online"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
