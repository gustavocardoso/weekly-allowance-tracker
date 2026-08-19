import { useEffect, useMemo, useState } from 'react';

import Button from '@/components/Button';
import ConfirmDialog from '@/components/ConfirmDialog';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { EmptyState, SectionCard } from '@/components/ui';
import { useToast } from '@/contexts/ToastContext';
import { useSituations } from '@/hooks/useSituations';
import { formatCurrency } from '@/lib/storage';
import type { EntryType, Situation } from '@/types/app';

const defaultForm = {
  name: '',
  emoji: '✨',
  type: 'reward' as EntryType,
  amount: '0.50',
};

const emojiOptions = [
  { value: '✨', label: '✨ Sparkles' },
  { value: '🎉', label: '🎉 Party' },
  { value: '🏆', label: '🏆 Trophy' },
  { value: '⭐', label: '⭐ Star' },
  { value: '💜', label: '💜 Heart' },
  { value: '😄', label: '😄 Happy' },
  { value: '😊', label: '😊 Smile' },
  { value: '😢', label: '😢 Sad' },
  { value: '😭', label: '😭 Crying' },
  { value: '😡', label: '😡 Angry' },
  { value: '😤', label: '😤 Frustrated' },
  { value: '⚠️', label: '⚠️ Warning' },
  { value: '❌', label: '❌ Wrong' },
  { value: '💔', label: '💔 Broken heart' },
  { value: '📚', label: '📚 Books' },
  { value: '🧹', label: '🧹 Cleaning' },
  { value: '🍽️', label: '🍽️ Dishes' },
  { value: '🛏️', label: '🛏️ Bed' },
  { value: '🎮', label: '🎮 Gaming' },
  { value: '📱', label: '📱 Phone' },
];

function SituationForm({
  initial,
  onSubmit,
  submitLabel,
  resetAfterSubmit = false,
}: {
  initial?: Situation;
  onSubmit: (values: { name: string; emoji: string; type: EntryType; amountCents: number }) => void;
  submitLabel: string;
  resetAfterSubmit?: boolean;
}) {
  const [name, setName] = useState(initial?.name ?? defaultForm.name);
  const [emoji, setEmoji] = useState(initial?.emoji ?? defaultForm.emoji);
  const [type, setType] = useState<EntryType>(initial?.type ?? defaultForm.type);
  const [amount, setAmount] = useState(initial ? String(initial.amountCents / 100) : defaultForm.amount);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setName(initial?.name ?? defaultForm.name);
    setEmoji(initial?.emoji ?? defaultForm.emoji);
    setType(initial?.type ?? defaultForm.type);
    setAmount(initial ? String(initial.amountCents / 100) : defaultForm.amount);
    setSubmitted(false);
  }, [initial]);

  const resetForm = () => {
    setName(defaultForm.name);
    setEmoji(defaultForm.emoji);
    setType(defaultForm.type);
    setAmount(defaultForm.amount);
    setSubmitted(false);
  };

  const amountCents = Math.round(Number(amount) * 100);
  const nameError = submitted && !name.trim() ? 'Situation name is required.' : undefined;
  const amountError = submitted && amountCents <= 0 ? 'Amount must be greater than zero.' : undefined;

  return (
    <form
      className="grid gap-3 md:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr_auto] md:items-end"
      onSubmit={(event) => {
        event.preventDefault();
        console.log('[SituationForm] Form submitted:', { name, emoji, type, amount, amountCents });
        setSubmitted(true);
        if (!name.trim() || amountCents <= 0) {
          console.log('[SituationForm] Validation failed:', { nameError: !name.trim(), amountError: amountCents <= 0 });
          return;
        }
        console.log('[SituationForm] Calling onSubmit with:', { name, emoji, type, amountCents });
        onSubmit({ name, emoji, type, amountCents });
        if (resetAfterSubmit) {
          resetForm();
        }
      }}
      noValidate
    >
      <Input label="Situation name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Finished homework" required error={nameError} />
      <Select
        label="Emoji"
        value={emoji}
        onChange={(event) => setEmoji(event.target.value)}
        options={emojiOptions}
      />
      <Select
        label="Type"
        value={type}
        onChange={(event) => setType(event.target.value as EntryType)}
        options={[{ value: 'reward', label: 'Reward' }, { value: 'penalty', label: 'Penalty' }]}
      />
      <Input label="Amount (CAD)" type="number" min="0.01" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.50" required error={amountError} />
      <Button type="submit" className="mb-[1px]">{submitLabel}</Button>
    </form>
  );
}

function SituationRow({ situation }: { situation: Situation }) {
  const { updateSituation, deleteSituation } = useSituations();
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <article className="rounded-3xl bg-slate-50 p-4" aria-label={`${situation.name}, ${situation.type}, ${formatCurrency(situation.amountCents)}`}>
      {editing ? (
        <SituationForm
          initial={situation}
          submitLabel="Save"
          onSubmit={async (values) => {
            try {
              await updateSituation(situation.id, values);
              setEditing(false);
              showToast({ title: 'Situation updated', description: `${values.name} is ready to use.`, variant: 'success' });
            } catch (error) {
              showToast({ title: 'Could not update situation', description: error instanceof Error ? error.message : 'Please try again.', variant: 'error' });
            }
          }}
        />
      ) : (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-950">
              {situation.emoji} {situation.name}
            </h3>
            <p className="text-sm text-slate-700">
              {situation.type === 'reward' ? 'Reward' : 'Penalty'} · {formatCurrency(situation.amountCents)} · order {situation.sortOrder + 1}
            </p>
            <p className="text-sm text-slate-700">Status: {situation.active ? 'Active' : 'Inactive'}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" aria-label={`Move ${situation.name} up`} onClick={async () => {
              try {
                await updateSituation(situation.id, { sortOrder: Math.max(0, situation.sortOrder - 1) });
              } catch (error) {
                showToast({ title: 'Could not reorder situation', description: error instanceof Error ? error.message : 'Please try again.', variant: 'error' });
              }
            }}>
              ↑
            </Button>
            <Button variant="secondary" size="sm" aria-label={`Move ${situation.name} down`} onClick={async () => {
              try {
                await updateSituation(situation.id, { sortOrder: situation.sortOrder + 1 });
              } catch (error) {
                showToast({ title: 'Could not reorder situation', description: error instanceof Error ? error.message : 'Please try again.', variant: 'error' });
              }
            }}>
              ↓
            </Button>
            <Button variant="secondary" size="sm" onClick={async () => {
              try {
                await updateSituation(situation.id, { active: !situation.active });
              } catch (error) {
                showToast({ title: 'Could not update situation', description: error instanceof Error ? error.message : 'Please try again.', variant: 'error' });
              }
            }}>
              {situation.active ? 'Deactivate' : 'Activate'}
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setEditing((value) => !value)}>
              {editing ? 'Cancel edit' : 'Edit'}
            </Button>
            <Button variant="danger" size="sm" onClick={() => setIsDeleteOpen(true)}>
              Delete
            </Button>
          </div>
        </div>
      )}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        title="Delete situation?"
        message={`Delete ${situation.name}? This action cannot be undone if the situation has not been used yet.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={async () => {
          try {
            await deleteSituation(situation.id);
            setIsDeleteOpen(false);
            showToast({ title: 'Situation deleted', description: `${situation.name} was removed.`, variant: 'success' });
          } catch (error) {
            showToast({ title: 'Could not delete situation', description: error instanceof Error ? error.message : 'Please try again.', variant: 'error' });
          }
        }}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </article>
  );
}

export default function SituationsPage() {
  const { situations, addSituation } = useSituations();
  const { showToast } = useToast();

  const active = useMemo(() => situations.filter((situation) => situation.active), [situations]);
  const inactive = useMemo(() => situations.filter((situation) => !situation.active), [situations]);

  return (
    <div className="space-y-6">
      <SectionCard>
        <h2 className="text-2xl font-bold text-slate-950">Add a situation</h2>
        <p className="mt-1 text-sm text-slate-700">Create rewards or penalties with colorful emoji labels.</p>
        <div className="mt-4">
          <SituationForm submitLabel="Add" resetAfterSubmit={true} onSubmit={async (values) => {
            console.log('[SituationsPage] SituationForm onSubmit called with:', values);
            try {
              console.log('[SituationsPage] Calling addSituation...');
              await addSituation(values);
              console.log('[SituationsPage] addSituation completed successfully');
              showToast({ title: 'Situation added', description: `${values.name} is now available for quick entry.`, variant: 'success' });
            } catch (error) {
              console.error('[SituationsPage] addSituation failed:', error);
              showToast({ title: 'Could not add situation', description: error instanceof Error ? error.message : 'Please try again.', variant: 'error' });
            }
          }} />
        </div>
      </SectionCard>

      <SectionCard>
        <h2 className="text-2xl font-bold text-slate-950">Active situations</h2>
        <div className="mt-4 space-y-3">
          {active.length === 0 ? <EmptyState title="No active situations" description="Add one above or reactivate an older situation." /> : active.map((situation) => <SituationRow key={situation.id} situation={situation} />)}
        </div>
      </SectionCard>

      <SectionCard>
        <h2 className="text-2xl font-bold text-slate-950">Inactive situations</h2>
        <div className="mt-4 space-y-3">
          {inactive.length === 0 ? <EmptyState title="Nothing inactive" description="Deactivated situations will rest here for later reuse." /> : inactive.map((situation) => <SituationRow key={situation.id} situation={situation} />)}
        </div>
      </SectionCard>
    </div>
  );
}
