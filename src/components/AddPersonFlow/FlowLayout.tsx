import { ProgressBar } from '@/components/ui/ProgressBar';
import { DashboardHeader } from '@/components/DashboardHeader';

interface FlowLayoutProps {
  stepNumber: number;
  stepTitle: string;
  pageHeading?: React.ReactNode;
  children: React.ReactNode;
}

export function FlowLayout({ stepNumber, stepTitle, pageHeading, children }: FlowLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background-light">
      <DashboardHeader />
      <div className="flex-1 max-w-[800px] mx-auto w-full px-6 py-10 lg:px-10">
        <ProgressBar
          currentStep={stepNumber}
          totalSteps={4}
          stepTitle={stepTitle}
          showFlowLabel={stepNumber === 1}
        />
        {pageHeading && (
          <h1 className="text-4xl font-bold text-foreground mb-2 mt-6 text-center py-6">
            {pageHeading}
          </h1>
        )}
        <div className="bg-white rounded-xl border border-border shadow-sm pt-6 px-8 pb-8">
          {children}
        </div>
        <footer className="mt-12 text-center text-sm text-muted">
          © 2024 GiftPlanner. Helping you build meaningful connections.
        </footer>
      </div>
    </div>
  );
}
