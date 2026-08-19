import { useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import { EmojiPicker } from '@/components/EmojiPicker';
import Input from '@/components/Input';
import { useProfile } from '@/hooks/useProfile';
import { formatCurrency } from '@/lib/storage';

const emojiOptions = ['🦄', '🚀', '🐯', '🌈', '🦊', '⭐'];

export default function SetupPage() {
  const navigate = useNavigate();
  const { hasProfile, setupProfile } = useProfile();
  const [childName, setChildName] = useState('');
  const [childEmoji, setChildEmoji] = useState('🦄');
  const [baseAmount, setBaseAmount] = useState('5');
  const [touched, setTouched] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const amountValue = Number(baseAmount);
  const errors = useMemo(
    () => ({
      childName: childName.trim() ? '' : 'Name is required.',
      baseAmount: Number.isFinite(amountValue) && amountValue > 0 ? '' : 'Amount must be more than 0.',
    }),
    [amountValue, childName],
  );

  if (hasProfile) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);

    console.log('[SetupPage] Form submitted', { childName, childEmoji, baseAmount, amountValue });
    console.log('[SetupPage] Errors:', errors);

    if (errors.childName || errors.baseAmount) {
      console.log('[SetupPage] Validation failed, focusing first input');
      firstInputRef.current?.focus();
      return;
    }

    const profileData = {
      childName,
      childEmoji,
      baseAmountCents: Math.round(amountValue * 100),
    };
    console.log('[SetupPage] Calling setupProfile with:', profileData);
    
    setupProfile(profileData);
    
    console.log('[SetupPage] Navigating to home...');
    navigate('/', { replace: true });
  };

  return (
    <div className="mx-auto grid min-h-screen max-w-5xl items-center gap-6 px-4 py-6 sm:py-10 lg:grid-cols-[1fr_0.85fr]">
      <section className="rounded-4xl bg-confetti p-6 shadow-card ring-1 ring-white/80 sm:p-8" aria-labelledby="setup-heading">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary-700">First-time setup</p>
        <h1 id="setup-heading" className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Let&apos;s create a cheerful allowance routine!</h1>
        <p className="mt-3 max-w-lg text-slate-800">Choose a name, a favorite emoji, and a weekly base amount to get your child&apos;s tracker started.</p>
        <div className="mt-8 flex h-32 w-32 items-center justify-center rounded-full bg-white/80 text-6xl shadow-lg sm:h-40 sm:w-40 sm:text-7xl" aria-label={`Selected emoji ${childEmoji}`}>{childEmoji}</div>
      </section>

      <form className="rounded-4xl bg-white p-5 shadow-lg ring-1 ring-slate-100 sm:p-6" onSubmit={handleSubmit} noValidate>
        <Input
          ref={firstInputRef}
          label="Child name"
          value={childName}
          onChange={(event) => setChildName(event.target.value)}
          placeholder="Sofia"
          required
          autoComplete="name"
          error={touched ? errors.childName : undefined}
        />

        <div className="mt-5">
          <EmojiPicker value={childEmoji} onChange={setChildEmoji} label="Choose an emoji" emojis={emojiOptions} />
        </div>

        <div className="mt-5">
          <Input
            type="number"
            min="0.01"
            step="0.01"
            label="Weekly base amount (CAD)"
            value={baseAmount}
            onChange={(event) => setBaseAmount(event.target.value)}
            placeholder="5.00"
            required
            hint={`Starting allowance: ${Number.isFinite(amountValue) ? formatCurrency(Math.round(amountValue * 100)) : '—'}`}
            error={touched ? errors.baseAmount : undefined}
          />
        </div>

        <Button type="submit" className="mt-6" fullWidth>
          Save and start tracking
        </Button>
      </form>
    </div>
  );
}
