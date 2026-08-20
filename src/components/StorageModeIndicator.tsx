import { useEffect, useState } from 'react';
import { StorageAdapter, type StorageMode } from '@/services/StorageAdapter';

export default function StorageModeIndicator() {
  const [mode, setMode] = useState<StorageMode>('local');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Get initial mode
    StorageAdapter.getMode().then(setMode);

    // Listen for mode changes
    const cleanup = StorageAdapter.addModeChangeListener((newMode) => {
      setMode(newMode);
    });

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      cleanup();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      {mode === 'cloud' ? (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200">
          <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          <span className="text-xs font-medium text-green-700">Cloud</span>
          {isOnline && (
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" title="Online" />
          )}
        </div>
      ) : (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
          <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
          <span className="text-xs font-medium text-slate-700">Local</span>
          {!isOnline && (
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400" title="Offline" />
          )}
        </div>
      )}
    </div>
  );
}
