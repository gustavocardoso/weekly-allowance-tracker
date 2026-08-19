import Button from '@/components/Button';
import Card from '@/components/Card';

export interface EmptyStateProps {
  emoji: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ emoji, title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-center gap-4 py-10 text-center">
      <span className="text-5xl" aria-hidden="true">
        {emoji}
      </span>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <p className="max-w-md text-sm text-slate-500">{message}</p>
      </div>
      {actionLabel && onAction ? <Button onClick={onAction}>{actionLabel}</Button> : null}
    </Card>
  );
}

export default EmptyState;
