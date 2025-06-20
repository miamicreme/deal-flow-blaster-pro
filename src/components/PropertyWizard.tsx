import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PropertyLocation from '@/components/property/PropertyLocation';
import PropertyFinancials from '@/components/property/PropertyFinancials';
import PropertyFeatures from '@/components/property/PropertyFeatures';
import PropertyImages from '@/components/property/PropertyImages';
import useOpenAI from '@/hooks/useOpenAI';

interface PropertyData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: string;
  arv: string;
  mao: string;
  description: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  yearBuilt: string;
  lotSize: string;
  images: File[];
}

const PropertyWizard = ({ onComplete }: { onComplete: (data: PropertyData) => void }) => {
  const { toast } = useToast();
  const { analyzeProperty, isAnalyzing } = useOpenAI();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PropertyData>({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    price: '',
    arv: '',
    mao: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    yearBuilt: '',
    lotSize: '',
    images: []
  });

  const totalSteps = 4;

  const handleInputChange = (field: keyof PropertyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const handleAIEnhance = () => {
    if (currentStep === 3 && formData.address && formData.city && formData.state) {
      analyzeProperty({ 
        propertyData: formData, 
        analysisType: 'property-description' 
      });
      
      toast({
        title: "AI Enhancement",
        description: "Generating enhanced property description...",
      });
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.address.trim() || !formData.city.trim() || !formData.state.trim() || !formData.zipCode.trim()) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required location fields.",
          variant: "destructive"
        });
        return;
      }
    }

    if (currentStep === 2) {
      if (!formData.price.trim()) {
        toast({
          title: "Missing Information",
          description: "Please enter the asking price.",
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
          <PropertyLocation
            formData={formData}
            onInputChange={handleInputChange}
          />
        );

      case 2:
        return (
          <PropertyFinancials
            formData={formData}
            onInputChange={handleInputChange}
          />
        );

      case 3:
        return (
          <div className="space-y-4">
            <PropertyFeatures
              formData={formData}
              onInputChange={handleInputChange}
            />
            {formData.address && formData.city && formData.state && (
              <Card className="border-dashed border-2 border-blue-200">
                <CardContent className="pt-6 text-center">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold mb-2">AI Enhancement Available</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Let AI generate a professional property description based on the details you've entered.
                  </p>
                  <Button 
                    onClick={handleAIEnhance} 
                    disabled={isAnalyzing}
                    variant="outline"
                    className="w-full"
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Enhance with AI
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 4:
        return (
          <PropertyImages
            formData={formData}
            onImageUpload={handleImageUpload}
          />
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Property Location";
      case 2: return "Financial Details";
      case 3: return "Property Features";
      case 4: return "Property Images";
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

export default PropertyWizard;
