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
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#e5e7eb]">
      <div className="flex-1">
        {stepNumber > 1 && onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-[#111817] hover:text-primary transition-colors flex items-center gap-1"
          >
            <Icon name="arrow-left" className="text-sm" />
            BACK
          </button>
        )}
      </div>
      <div className="flex-1 flex justify-center">
        <Button
          variant="primary"
          onClick={onContinue}
          disabled={isLoading}
          fullWidth
          icon="arrow-right"
          iconPosition="right"
        >
          {continueLabel}
        </Button>
      </div>
      <div className="flex-1 flex justify-end">
        {canSkip && onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-[#111817] hover:text-primary transition-colors"
          >
            {stepNumber === 3 ? 'SKIP FOR NOW' : 'SKIP THIS STEP'}
          </button>
        )}
      </div>
    </div>
  );
}
