
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import MobileLayout from '@/components/MobileLayout';
import PropertyWizard from '@/components/PropertyWizard';
import AIValidation from '@/components/AIValidation';
import { useState } from 'react';

const AddProperty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showValidation, setShowValidation] = useState(false);
  const [propertyData, setPropertyData] = useState<any>(null);

  const handlePropertyComplete = (data: any) => {
    console.log('Property data:', data);
    setPropertyData(data);
    setShowValidation(true);
    
    toast({
      title: "Property Added Successfully!",
      description: "Your property has been saved and analyzed by AI.",
    });
    
    // Navigate to deals page after 3 seconds
    setTimeout(() => {
      navigate('/deals');
    }, 3000);
  };

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add Property</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create a new deal with AI assistance
            </p>
          </div>
        </div>

        {!showValidation ? (
          <PropertyWizard onComplete={handlePropertyComplete} />
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Property Analysis Complete</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Our AI has analyzed your deal. Review the results below.
              </p>
            </div>
            
            <AIValidation propertyData={propertyData} />
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => setShowValidation(false)}
                className="flex-1"
              >
                Edit Property
              </Button>
              <Button 
                onClick={() => navigate('/deals')}
                className="flex-1"
              >
                View All Deals
              </Button>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default AddProperty;
