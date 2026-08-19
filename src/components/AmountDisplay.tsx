import { formatCentsToCad } from '@/utils/currency';
import { classNames } from '@/utils/classNames';

export interface AmountDisplayProps {
  amountInCents: number;
  showSign?: boolean;
  emphasize?: boolean;
}

export function AmountDisplay({ amountInCents, showSign = true, emphasize = false }: AmountDisplayProps) {
  const isPositive = amountInCents >= 0;
  const sign = showSign ? (amountInCents > 0 ? '+' : amountInCents < 0 ? '-' : '') : '';

  return (
    <span
      className={classNames(
        'inline-flex items-center gap-1 font-semibold',
        emphasize && 'text-2xl sm:text-3xl',
        isPositive ? 'text-reward-600' : 'text-penalty-600',
      )}
      aria-label={`${isPositive ? 'Positive' : 'Negative'} amount ${formatCentsToCad(Math.abs(amountInCents))}`}
    >
      <span aria-hidden="true">{sign}</span>
      <span>{formatCentsToCad(Math.abs(amountInCents))}</span>
    </span>
  );
}

export default AmountDisplay;
