
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Eye, Edit, Share, Mail, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Deal {
  id: string;
  address: string;
  city: string;
  state: string;
  price: number;
  arv: number;
  status: 'active' | 'sold' | 'pending';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  created_at: string;
}

const Deals = () => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState<Deal[]>([
    // Sample data - will be replaced with Supabase data
    {
      id: '1',
      address: '123 Main Street',
      city: 'Atlanta',
      state: 'GA',
      price: 275000,
      arv: 350000,
      status: 'active',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1500,
      created_at: '2024-01-15'
    },
    {
      id: '2',
      address: '456 Oak Avenue',
      city: 'Birmingham',
      state: 'AL',
      price: 185000,
      arv: 275000,
      status: 'pending',
      bedrooms: 4,
      bathrooms: 2.5,
      sqft: 1800,
      created_at: '2024-01-20'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Deals</h1>
              <p className="text-gray-600 mt-2">Manage your property deals and landing pages</p>
            </div>
            <Button onClick={() => navigate('/create-deal')}>
              <Plus className="h-4 w-4 mr-2" />
              New Deal
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <Card key={deal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{deal.address}</CardTitle>
                    <CardDescription>{deal.city}, {deal.state}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(deal.status)}>
                    {deal.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="font-semibold">{formatCurrency(deal.price)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">ARV:</span>
                    <span className="font-semibold">{formatCurrency(deal.arv)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Bed/Bath:</span>
                    <span>{deal.bedrooms}bd / {deal.bathrooms}ba</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sq Ft:</span>
                    <span>{deal.sqft.toLocaleString()}</span>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Share className="h-4 w-4 mr-1" />
                        Share Link
                      </Button>
                      <Button size="sm" variant="secondary" className="flex-1">
                        <Mail className="h-4 w-4 mr-1" />
                        Blast
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {deals.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No deals yet</h3>
              <p className="text-gray-600 mb-6">Create your first deal to get started with Deal Blaster</p>
              <Button onClick={() => navigate('/create-deal')}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Deal
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals;
