
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface BuyerWizardProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

const BuyerWizardProgress = ({ currentStep, totalSteps, stepTitle }: BuyerWizardProgressProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-lg">{stepTitle}</CardTitle>
          <span className="text-sm text-muted-foreground">
            {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </CardHeader>
    </Card>
  );
};

export default BuyerWizardProgress;
