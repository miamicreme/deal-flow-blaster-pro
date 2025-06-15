import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Eye, Edit, Share, Mail, Plus, Search, Filter, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DealAnalyzer from '@/components/DealAnalyzer';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [deals, setDeals] = useState<Deal[]>([
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
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'sold': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredDeals = deals.filter(deal =>
    deal.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const profit = (deal: Deal) => deal.arv - deal.price;

  const handleAnalyzeDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setShowAnalyzer(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-6 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-light text-slate-900 mb-2">Deal Portfolio</h1>
              <p className="text-slate-600 text-lg">Manage your investment opportunities with AI analysis</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search deals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-80 border-0 bg-white shadow-sm"
                />
              </div>
              
              <Button 
                onClick={() => setShowAnalyzer(true)}
                variant="outline"
                className="border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Deal Analyzer
              </Button>
              
              <Button 
                onClick={() => navigate('/create-deal')}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Deal
              </Button>
            </div>
          </div>
        </div>

        {showAnalyzer && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Deal Analysis</h2>
              <Button 
                variant="outline" 
                onClick={() => setShowAnalyzer(false)}
              >
                Close Analyzer
              </Button>
            </div>
            <DealAnalyzer 
              propertyData={selectedDeal ? {
                price: selectedDeal.price,
                sqft: selectedDeal.sqft,
                bedrooms: selectedDeal.bedrooms,
                bathrooms: selectedDeal.bathrooms
              } : undefined}
            />
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="text-2xl font-light text-slate-900">{deals.length}</div>
              <div className="text-slate-600 text-sm">Total Deals</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="text-2xl font-light text-emerald-600">
                {deals.filter(d => d.status === 'active').length}
              </div>
              <div className="text-slate-600 text-sm">Active Listings</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="text-2xl font-light text-slate-900">
                {formatCurrency(deals.reduce((sum, deal) => sum + profit(deal), 0))}
              </div>
              <div className="text-slate-600 text-sm">Total Potential Profit</div>
            </CardContent>
          </Card>
        </div>

        {/* Deals Grid */}
        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => (
              <Card key={deal.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white group">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-medium text-slate-900 mb-1">
                        {deal.address}
                      </CardTitle>
                      <CardDescription className="text-slate-500">
                        {deal.city}, {deal.state}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={`${getStatusColor(deal.status)} border`}>
                      {deal.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Financial Info */}
                    <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Purchase Price</span>
                        <span className="font-medium text-slate-900">{formatCurrency(deal.price)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">ARV</span>
                        <span className="font-medium text-slate-900">{formatCurrency(deal.arv)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center border-t border-slate-200 pt-2">
                        <span className="text-sm font-medium text-slate-700">Potential Profit</span>
                        <span className="font-semibold text-emerald-600">
                          {formatCurrency(profit(deal))}
                        </span>
                      </div>
                    </div>
                    
                    {/* Property Details */}
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>{deal.bedrooms}bd / {deal.bathrooms}ba</span>
                      <span>{deal.sqft.toLocaleString()} sq ft</span>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1 text-slate-700 border-slate-200 hover:bg-slate-50">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 text-slate-700 border-slate-200 hover:bg-slate-50"
                        onClick={() => handleAnalyzeDeal(deal)}
                      >
                        <Calculator className="h-3 w-3 mr-1" />
                        Analyze
                      </Button>
                      <Button size="sm" className="flex-1 bg-slate-900 hover:bg-slate-800">
                        <Mail className="h-3 w-3 mr-1" />
                        Blast
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-2">
                {searchTerm ? 'No deals found' : 'Start building your portfolio'}
              </h3>
              <p className="text-slate-600 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'Create your first deal to begin attracting serious investors'
                }
              </p>
              {!searchTerm && (
                <Button 
                  onClick={() => navigate('/create-deal')}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Deal
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals;
