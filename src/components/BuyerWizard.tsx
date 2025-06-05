
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BusinessCardScanner from '@/components/buyer/BusinessCardScanner';
import BuyerBasicInfo from '@/components/buyer/BuyerBasicInfo';
import BuyerPreferences from '@/components/buyer/BuyerPreferences';

interface BuyerData {
  name: string;
  email: string;
  phone: string;
  location: string;
  maxBudget: string;
  preferences: string;
}

const BuyerWizard = ({ onComplete }: { onComplete: (data: BuyerData) => void }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BuyerData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    maxBudget: '',
    preferences: ''
  });

  const totalSteps = 3;

  const handleInputChange = (field: keyof BuyerData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBusinessCardData = (data: any) => {
    setFormData(prev => ({
      ...prev,
      name: data.name || prev.name,
      email: data.email || prev.email,
      phone: data.phone || prev.phone,
      location: data.location || prev.location
    }));
    setCurrentStep(2);
  };

  const nextStep = () => {
    if (currentStep === 2) {
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim()) {
        toast({
          title: "Missing Information",
          description: "Please fill in the required fields (Name and Email).",
          variant: "destructive"
        });
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BusinessCardScanner
            onDataExtracted={handleBusinessCardData}
            onSkip={() => setCurrentStep(2)}
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

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Scan Business Card";
      case 2: return "Contact Information";
      case 3: return "Investment Preferences";
      default: return "";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress Header */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-lg">{getStepTitle()}</CardTitle>
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

      {/* Step Content */}
      <div className="mb-6">
        {renderStep()}
      </div>
      
      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button onClick={nextStep} className="flex-1">
              {currentStep === totalSteps ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerWizard;
