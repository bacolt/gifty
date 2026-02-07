interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitle?: string;
  showFlowLabel?: boolean;
}

export function ProgressBar({
  currentStep,
  totalSteps,
  stepTitle,
  showFlowLabel = false,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {showFlowLabel}
      <div className="flex items-center justify-between mb-2">
        {stepTitle && (
          <h2 className="text-sm font-bold text-foreground">{stepTitle}</h2>
        )}
        <span className="text-sm text-muted">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
