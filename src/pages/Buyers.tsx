
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Mail, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import MobileLayout from '@/components/MobileLayout';
import BuyersViewOptions from '@/components/BuyersViewOptions';
import { Buyer } from '@/types/buyer';
import { useBuyers } from '@/hooks/useBuyers';

const Buyers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { buyers, loading, deleteBuyer } = useBuyers();

  const handleEditBuyer = (buyer: Buyer) => {
    toast({
      title: "Edit Buyer",
      description: "Edit functionality coming soon!",
    });
  };

  const handleDeleteBuyer = (id: string) => {
    deleteBuyer(id);
  };

  const handleEmailBuyer = (buyer: Buyer) => {
    toast({
      title: "Email Sent",
      description: `Email sent to ${buyer.name}`,
    });
  };

  const handleBulkEmail = () => {
    toast({
      title: "Email Blast Sent",
      description: `Email sent to ${buyers.length} buyers in your list.`,
    });
  };

  if (loading) {
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
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Buyer Management</h1>
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
          </div>
        </div>
      </MobileLayout>
    );
  }

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
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Buyer Management</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {buyers.length} buyers in your list
            </p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button 
            size="sm" 
            onClick={() => navigate('/add-buyer')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Buyer
          </Button>
          <Button 
            variant="outline" 
            size="sm"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleBulkEmail}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email All ({buyers.length})
          </Button>
        </div>

        <BuyersViewOptions
          buyers={buyers}
          onEdit={handleEditBuyer}
          onDelete={handleDeleteBuyer}
          onEmail={handleEmailBuyer}
        />
      </div>
    </MobileLayout>
  );
};

export default Buyers;
