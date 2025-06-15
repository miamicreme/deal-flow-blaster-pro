
import { Card, CardContent } from '@/components/ui/card';
import { Deal } from '@/types/deals';
import { formatCurrency } from '@/utils/formatters';
import { calculateProfit } from '@/utils/dealUtils';

interface DealsStatsOverviewProps {
  deals: Deal[];
}

const DealsStatsOverview = ({ deals }: DealsStatsOverviewProps) => {
  return (
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
            {formatCurrency(deals.reduce((sum, deal) => sum + calculateProfit(deal), 0))}
          </div>
          <div className="text-slate-600 text-sm">Total Potential Profit</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealsStatsOverview;
