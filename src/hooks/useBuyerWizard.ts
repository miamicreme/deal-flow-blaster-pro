
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface BuyerData {
  name: string;
  email: string;
  phone: string;
  location: string;
  maxBudget: string;
  preferences: string;
}

const useBuyerWizard = (onComplete: (data: BuyerData) => void) => {
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

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Scan Business Card";
      case 2: return "Contact Information";
      case 3: return "Investment Preferences";
      default: return "";
    }
  };

  return {
    currentStep,
    totalSteps,
    formData,
    handleInputChange,
    handleBusinessCardData,
    nextStep,
    prevStep,
    getStepTitle
  };
};

export default useBuyerWizard;
