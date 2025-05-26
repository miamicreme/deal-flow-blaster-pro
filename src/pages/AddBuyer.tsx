
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import MobileLayout from '@/components/MobileLayout';
import BuyerWizard from '@/components/BuyerWizard';

const AddBuyer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBuyerComplete = (data: any) => {
    console.log('Buyer data:', data);
    
    toast({
      title: "Buyer Added Successfully!",
      description: "Your buyer has been added to your list.",
    });
    
    navigate('/buyers');
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
            <h1 className="text-2xl font-bold">Add Buyer</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Add a new buyer with business card scanning
            </p>
          </div>
        </div>

        <BuyerWizard onComplete={handleBuyerComplete} />
      </div>
    </MobileLayout>
  );
};

export default AddBuyer;
