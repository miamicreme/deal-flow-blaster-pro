
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Calculator, Mail } from 'lucide-react';
import { Deal } from '@/types/deals';
import { formatCurrency } from '@/utils/formatters';
import { getStatusColor, calculateProfit } from '@/utils/dealUtils';

interface DealCardProps {
  deal: Deal;
  onAnalyze: (deal: Deal) => void;
}

const DealCard = ({ deal, onAnalyze }: DealCardProps) => {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white group">
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
                {formatCurrency(calculateProfit(deal))}
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
              onClick={() => onAnalyze(deal)}
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
  );
};

export default DealCard;
