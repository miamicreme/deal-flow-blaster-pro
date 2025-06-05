
import BusinessCardScanner from '@/components/buyer/BusinessCardScanner';
import BuyerBasicInfo from '@/components/buyer/BuyerBasicInfo';
import BuyerPreferences from '@/components/buyer/BuyerPreferences';
import BuyerWizardProgress from '@/components/buyer/BuyerWizardProgress';
import BuyerWizardNavigation from '@/components/buyer/BuyerWizardNavigation';
import useBuyerWizard from '@/hooks/useBuyerWizard';

interface BuyerData {
  name: string;
  email: string;
  phone: string;
  location: string;
  maxBudget: string;
  preferences: string;
}

const BuyerWizard = ({ onComplete }: { onComplete: (data: BuyerData) => void }) => {
  const {
    currentStep,
    totalSteps,
    formData,
    handleInputChange,
    handleBusinessCardData,
    nextStep,
    prevStep,
    getStepTitle
  } = useBuyerWizard(onComplete);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BusinessCardScanner
            onDataExtracted={handleBusinessCardData}
            onSkip={() => nextStep()}
          />
        );

      case 2:
        return (
          <BuyerBasicInfo
            formData={formData}
            onInputChange={handleInputChange}
          />
        );

      case 3:
        return (
          <BuyerPreferences
            formData={formData}
            onInputChange={handleInputChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <BuyerWizardProgress 
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepTitle={getStepTitle()}
      />

      <div className="mb-6">
        {renderStep()}
      </div>
      
      <BuyerWizardNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={nextStep}
        onPrevious={prevStep}
      />
    </div>
  );
};

export default BuyerWizard;
