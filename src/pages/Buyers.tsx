
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Mail, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import MobileLayout from '@/components/MobileLayout';
import BuyersViewOptions from '@/components/BuyersViewOptions';

interface Buyer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  maxBudget: number;
  preferences: string;
  created_at: string;
}

const Buyers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [buyers, setBuyers] = useState<Buyer[]>([
    // Sample data - will be replaced with Supabase data
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      location: 'Atlanta, GA',
      maxBudget: 300000,
      preferences: 'Single family homes, 3+ bedrooms',
      created_at: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '(555) 987-6543',
      location: 'Birmingham, AL',
      maxBudget: 250000,
      preferences: 'Investment properties, fix & flip',
      created_at: '2024-01-20'
    }
  ]);

  const handleEditBuyer = (buyer: Buyer) => {
    toast({
      title: "Edit Buyer",
      description: "Edit functionality coming soon!",
    });
  };

  const handleDeleteBuyer = (id: string) => {
    setBuyers(prev => prev.filter(buyer => buyer.id !== id));
    toast({
      title: "Buyer Removed",
      description: "Buyer has been removed from your list.",
    });
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
