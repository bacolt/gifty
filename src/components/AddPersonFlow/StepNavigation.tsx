import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

interface StepNavigationProps {
  stepNumber: number;
  onBack?: () => void;
  onContinue: () => void;
  onSkip?: () => void;
  continueLabel: string;
  canSkip?: boolean;
  isLoading?: boolean;
}

export function StepNavigation({
  stepNumber,
  onBack,
  onContinue,
  onSkip,
  continueLabel,
  canSkip = false,
  isLoading = false,
}: StepNavigationProps) {
  return (
    <div className="mt-8 pt-6 space-y-4">
      <Button
        variant="primary"
        onClick={onContinue}
        disabled={isLoading}
        fullWidth
        icon="arrow-right"
        iconPosition="right"
        className="py-3 rounded-[10px]"
      >
        {continueLabel}
      </Button>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {stepNumber > 1 && onBack && (
            <button
              type="button"
              onClick={onBack}
              className="text-xs text-muted hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Icon name="arrow-left" className="text-[10px]" />
              Back
            </button>
          )}
        </div>
        <div className="flex-1 flex justify-end">
          {canSkip && onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              {stepNumber === 3 ? 'Skip for now' : 'Skip this step'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
