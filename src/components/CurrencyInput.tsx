import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

import Input from '@/components/Input';
import { formatCurrencyInput, parseCurrencyInput } from '@/utils/currency';

export interface CurrencyInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label: string;
  value: number | null;
  onChange: (valueInCents: number | null) => void;
  error?: string;
  hint?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(function CurrencyInput(
  { label, value, onChange, onBlur, ...props },
  ref,
) {
  return (
    <Input
      {...props}
      ref={ref}
      label={label}
      inputMode="decimal"
      placeholder="0.00"
      value={value === null ? '' : formatCurrencyInput(value)}
      onChange={(event) => onChange(parseCurrencyInput(event.target.value))}
      onBlur={onBlur}
    />
  );
});

export default CurrencyInput;
