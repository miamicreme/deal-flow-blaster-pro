
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import DealAnalyzer from '@/components/DealAnalyzer';
import DealsHeader from '@/components/deals/DealsHeader';
import DealsStatsOverview from '@/components/deals/DealsStatsOverview';
import DealCard from '@/components/deals/DealCard';
import DealsEmptyState from '@/components/deals/DealsEmptyState';
import { Deal } from '@/types/deals';
import { filterDeals } from '@/utils/dealUtils';

const Deals = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [deals] = useState<Deal[]>([
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

  const filteredDeals = filterDeals(deals, searchTerm);

  const handleAnalyzeDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setShowAnalyzer(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <DealsHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onShowAnalyzer={() => setShowAnalyzer(true)}
          onNavigateDashboard={() => navigate('/dashboard')}
          onCreateDeal={() => navigate('/create-deal')}
        />

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

        <DealsStatsOverview deals={deals} />

        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => (
              <DealCard 
                key={deal.id} 
                deal={deal} 
                onAnalyze={handleAnalyzeDeal}
              />
            ))}
          </div>
        ) : (
          <DealsEmptyState 
            searchTerm={searchTerm}
            onCreateDeal={() => navigate('/create-deal')}
          />
        )}
      </div>
    </div>
  );
};

export default Deals;
