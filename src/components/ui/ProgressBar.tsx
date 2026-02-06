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
      {showFlowLabel && (
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2 text-center">
          ONBOARDING FLOW
        </p>
      )}
      <div className="flex items-center justify-between mb-2">
        {stepTitle && (
          <h2 className="text-2xl font-bold text-[#111817]">{stepTitle}</h2>
        )}
        <span className="text-sm text-[#638885]">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="w-full h-2 bg-[#f0f4f4] rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
