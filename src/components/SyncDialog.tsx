import { useState } from 'react';
import { syncService, type SyncProgress } from '@/services/SyncService';
import Button from '@/components/Button';

interface SyncDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncComplete: () => void;
  localDataCounts: {
    profiles: number;
    situations: number;
    cycles: number;
    entries: number;
  };
}

export default function SyncDialog({ isOpen, onClose, onSyncComplete, localDataCounts }: SyncDialogProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState<SyncProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSyncToCloud = async () => {
    setIsSyncing(true);
    setError(null);

    try {
      await syncService.syncToCloud((progress) => {
        setSyncProgress(progress);
      });

      // Success!
      setTimeout(() => {
        onSyncComplete();
        onClose();
      }, 500);
    } catch (err: any) {
      console.error('Error syncing to cloud:', err);
      setError(err.message || 'Failed to sync data');
      setIsSyncing(false);
    }
  };

  const handleStartFresh = async () => {
    setIsSyncing(true);
    setError(null);

    try {
      await syncService.clearLocalData();
      
      // Success!
      setTimeout(() => {
        onSyncComplete();
        onClose();
      }, 300);
    } catch (err: any) {
      console.error('Error clearing local data:', err);
      setError(err.message || 'Failed to clear local data');
      setIsSyncing(false);
    }
  };

  const totalItems = localDataCounts.profiles + localDataCounts.situations + localDataCounts.cycles + localDataCounts.entries;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">☁️</div>
          <h2 className="text-2xl font-bold mb-2">Sync Your Data</h2>
          <p className="text-slate-600">
            You have local data on this device. What would you like to do?
          </p>
        </div>

        {/* Local Data Summary */}
        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-sm text-slate-700 mb-3">Local Data Found:</h3>
          <div className="space-y-2 text-sm">
            {localDataCounts.profiles > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Profile:</span>
                <span className="font-medium">{localDataCounts.profiles}</span>
              </div>
            )}
            {localDataCounts.situations > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Situations:</span>
                <span className="font-medium">{localDataCounts.situations}</span>
              </div>
            )}
            {localDataCounts.cycles > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Cycles:</span>
                <span className="font-medium">{localDataCounts.cycles}</span>
              </div>
            )}
            {localDataCounts.entries > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Entries:</span>
                <span className="font-medium">{localDataCounts.entries}</span>
              </div>
            )}
            <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between font-semibold">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        {isSyncing && syncProgress && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
                <span className="text-slate-600">{syncProgress.step}</span>
              </div>
              <span className="font-medium">{syncProgress.current}/{syncProgress.total}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-purple-600 h-full transition-all duration-300"
                style={{ width: `${(syncProgress.current / syncProgress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Actions */}
        {!isSyncing ? (
          <div className="space-y-3">
            <Button
              onClick={handleSyncToCloud}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Sync to Cloud
              </span>
            </Button>
            
            <Button
              onClick={handleStartFresh}
              variant="secondary"
              className="w-full py-3"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Start Fresh (Delete Local Data)
              </span>
            </Button>

            <button
              onClick={onClose}
              className="w-full text-sm text-slate-600 hover:text-slate-800 py-2"
            >
              Keep Local Data (Use Offline)
            </button>
          </div>
        ) : (
          <div className="text-center text-slate-600">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-purple-600 mb-2" />
            <p className="text-sm">Please wait...</p>
          </div>
        )}

        {/* Info */}
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Sync to Cloud:</strong> Upload your local data to sync across devices.
            <br />
            <strong>Start Fresh:</strong> Delete local data and start with a clean slate.
            <br />
            <strong>Keep Local:</strong> Continue using the app offline with your local data.
          </p>
        </div>
      </div>
    </div>
  );
}
