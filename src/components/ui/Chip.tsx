import { Icon } from '@/components/ui/Icon';

interface ChipProps {
  label: string;
  onDelete?: () => void;
  variant?: 'default' | 'suggestion';
  onClick?: () => void;
}

export function Chip({ label, onDelete, variant = 'default', onClick }: ChipProps) {
  const isSuggestion = variant === 'suggestion';
  const isClickable = onClick && !onDelete;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
        isSuggestion
          ? 'bg-white border border-border text-foreground hover:bg-surface cursor-pointer'
          : 'bg-primary/15 text-foreground border-2 border-primary/40'
      } ${isClickable ? 'cursor-pointer hover:bg-primary/20' : ''}`}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      <span className="font-bold">{label}</span>
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
          aria-label={`Remove ${label}`}
        >
          <Icon name="x" className="text-sm" />
        </button>
      )}
    </div>
  );
}
