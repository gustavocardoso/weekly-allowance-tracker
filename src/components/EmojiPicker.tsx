import { classNames } from '@/utils/classNames';

const defaultEmojis = ['🎉', '🌟', '🦄', '🚀', '🍀', '😄', '🏆', '💜'];

export interface EmojiPickerProps {
  value?: string;
  onChange: (emoji: string) => void;
  label?: string;
  emojis?: string[];
}

export function EmojiPicker({ value, onChange, label = 'Choose an emoji', emojis = defaultEmojis }: EmojiPickerProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-medium text-slate-800">{label}</legend>
      <div className="flex flex-wrap gap-3" role="list" aria-label={label}>
        {emojis.map((emoji) => {
          const isSelected = value === emoji;

          return (
            <button
              key={emoji}
              type="button"
              onClick={() => onChange(emoji)}
              className={classNames(
                'flex h-12 w-12 items-center justify-center rounded-xl border bg-white text-2xl shadow-sm transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                isSelected
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                  : 'border-slate-300 hover:border-primary-300 hover:bg-primary-50',
              )}
              aria-pressed={isSelected}
              aria-label={`Select ${emoji}`}
            >
              <span aria-hidden="true">{emoji}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default EmojiPicker;
