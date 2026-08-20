import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import ConfirmDialog from '@/components/ConfirmDialog';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { SectionCard } from '@/components/ui';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/contexts/ToastContext';
import { useProfile } from '@/hooks/useProfile';
import { createBackupFileName, formatCurrency } from '@/lib/storage';

const childEmojiOptions = [
  { value: '🦄', label: '🦄 Unicorn' },
  { value: '🐶', label: '🐶 Dog' },
  { value: '🐱', label: '🐱 Cat' },
  { value: '🦊', label: '🦊 Fox' },
  { value: '🐼', label: '🐼 Panda' },
  { value: '🦁', label: '🦁 Lion' },
  { value: '🐯', label: '🐯 Tiger' },
  { value: '🐸', label: '🐸 Frog' },
  { value: '🦋', label: '🦋 Butterfly' },
  { value: '⭐', label: '⭐ Star' },
  { value: '🌈', label: '🌈 Rainbow' },
  { value: '🎨', label: '🎨 Art' },
];

export default function SettingsPage() {
  const { profile, updateProfile } = useProfile();
  const { exportData, exportDatabase, importDataFile, resetAllData, error } = useAppContext();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [childName, setChildName] = useState('');
  const [childEmoji, setChildEmoji] = useState('🦄');
  const [baseAmount, setBaseAmount] = useState('5');
  const [showBaseAmountDialog, setShowBaseAmountDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (!profile) {
      return;
    }

    setChildName(profile.childName);
    setChildEmoji(profile.childEmoji);
    setBaseAmount(String(profile.baseAmountCents / 100));
  }, [profile]);

  if (!profile) {
    return null;
  }

  const commitSave = () => {
    setIsSaving(true);
    const nextBaseAmountCents = Math.round(Number(baseAmount) * 100);
    try {
      updateProfile({ childName, childEmoji, baseAmountCents: nextBaseAmountCents });
      showToast({ title: 'Settings saved', variant: 'success' });
      setShowBaseAmountDialog(false);
    } catch (caughtError) {
      console.error('Failed to save settings.', caughtError);
      showToast({ title: 'Could not save settings', description: caughtError instanceof Error ? caughtError.message : 'Please try again.', variant: 'error' });
    } finally {
      window.setTimeout(() => setIsSaving(false), 350);
    }
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    const nextBaseAmountCents = Math.round(Number(baseAmount) * 100);
    if (nextBaseAmountCents !== profile.baseAmountCents) {
      setShowBaseAmountDialog(true);
      return;
    }

    commitSave();
  };

  const handleExport = () => {
    try {
      const blob = new Blob([exportData()], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = createBackupFileName();
      link.click();
      URL.revokeObjectURL(url);
      showToast({ title: 'Backup downloaded', description: 'JSON backup created successfully.', variant: 'success' });
    } catch (caughtError) {
      console.error('Failed to export JSON backup.', caughtError);
      showToast({ title: 'Export failed', description: caughtError instanceof Error ? caughtError.message : 'Could not create backup.', variant: 'error' });
    }
  };

  const handleDatabaseExport = async () => {
    try {
      await exportDatabase();
      showToast({ title: 'Database downloaded', description: 'SQLite backup downloaded successfully.', variant: 'success' });
    } catch (caughtError) {
      console.error('Failed to export database backup.', caughtError);
      showToast({ title: 'Database export failed', description: caughtError instanceof Error ? caughtError.message : 'Could not download the database file.', variant: 'error' });
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) {
      return;
    }

    try {
      const raw = await file.text();
      importDataFile(raw);
      showToast({ title: 'Data imported', description: 'Your tracker was restored from JSON.', variant: 'info' });
    } catch (caughtError) {
      console.error('Failed to import data backup.', caughtError);
      showToast({ title: 'Import failed', description: caughtError instanceof Error ? caughtError.message : 'The selected file could not be imported.', variant: 'error' });
    }
  };

  const handleResetAll = async () => {
    setIsResetting(true);
    try {
      resetAllData();
      showToast({ title: 'All data cleared', description: 'Profile and all data have been deleted.', variant: 'success' });
      setShowResetDialog(false);
      // Redirect to setup page after a short delay
      setTimeout(() => {
        navigate('/setup');
      }, 500);
    } catch (caughtError) {
      console.error('Failed to reset data.', caughtError);
      showToast({ title: 'Reset failed', description: caughtError instanceof Error ? caughtError.message : 'Could not clear data.', variant: 'error' });
      setIsResetting(false);
    }
  };

  return (
    <div className="space-y-6">
      <SectionCard>
        <h2 className="text-2xl font-bold">Profile settings</h2>
        <form className="mt-4 grid gap-4 md:grid-cols-3" onSubmit={handleSave}>
          <Input label="Child name" value={childName} onChange={(event) => setChildName(event.target.value)} />
          <Select
            label="Emoji"
            value={childEmoji}
            onChange={(event) => setChildEmoji(event.target.value)}
            options={childEmojiOptions}
          />
          <Input label="Base amount (CAD)" type="number" min="0.01" step="0.01" value={baseAmount} onChange={(event) => setBaseAmount(event.target.value)} />
          <div className="flex flex-col gap-3 md:col-span-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-500">Current base amount: {formatCurrency(profile.baseAmountCents)}</p>
            <Button type="submit" className="w-full md:w-auto" disabled={isSaving}>
              {isSaving ? 'Saving…' : 'Save profile'}
            </Button>
          </div>
        </form>
      </SectionCard>

      <SectionCard>
        <h2 className="text-2xl font-bold">Backup and restore</h2>
        <p className="mt-2 text-sm text-slate-600">Exports include profile, situations, cycles, and entries. Import validation blocks corrupt or inconsistent files.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button className="w-full sm:w-auto" onClick={handleExport}>
            Export JSON
          </Button>
          <Button variant="secondary" className="w-full bg-primary-100 text-primary-900 hover:bg-primary-200 sm:w-auto" onClick={handleDatabaseExport}>
            Download database file
          </Button>
          <Button variant="secondary" className="w-full border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 sm:w-auto" onClick={() => fileInputRef.current?.click()}>
            Import data
          </Button>
          <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
        </div>
        {error ? <p className="mt-3 text-sm text-penalty-700">Last backup error: {error}</p> : null}
      </SectionCard>

      <SectionCard className="border-2 border-penalty-200 bg-penalty-50">
        <h2 className="text-2xl font-bold text-penalty-900">Danger zone</h2>
        <p className="mt-2 text-sm text-penalty-800">This action cannot be undone. All profile data, situations, cycles, and entries will be permanently deleted.</p>
        <Button 
          variant="danger" 
          className="mt-4 w-full bg-penalty-700 text-white hover:bg-penalty-800 sm:w-auto" 
          onClick={() => setShowResetDialog(true)}
        >
          Clear all data
        </Button>
      </SectionCard>

      <SectionCard>
        <h2 className="text-2xl font-bold">About</h2>
        <p className="mt-3 text-slate-600">This playful app tracks weekly allowance, rewards, and penalties with a Monday-to-Sunday cycle and child-friendly visuals.</p>
      </SectionCard>

      <ConfirmDialog
        isOpen={showBaseAmountDialog}
        title="Update the weekly base amount?"
        message="This change only affects brand-new weeks. History and the current week stay exactly the same."
        confirmLabel="Yes, update it"
        cancelLabel="Keep current amount"
        icon="💰"
        isConfirming={isSaving}
        onCancel={() => setShowBaseAmountDialog(false)}
        onConfirm={commitSave}
      />

      <ConfirmDialog
        isOpen={showResetDialog}
        title="Clear all data?"
        message="This will permanently delete your profile, all situations, cycles, and entries. This action cannot be undone. Are you absolutely sure?"
        confirmLabel="Yes, delete everything"
        cancelLabel="Cancel"
        icon="🗑️"
        isConfirming={isResetting}
        onCancel={() => setShowResetDialog(false)}
        onConfirm={handleResetAll}
      />
    </div>
  );
}
