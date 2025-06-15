
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

const QuickAnalysisWidget = () => {
  const [price, setPrice] = useState('');
  const [arv, setArv] = useState('');
  const [repairs, setRepairs] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateQuick = () => {
    const purchasePrice = parseFloat(price) || 0;
    const afterRepairValue = parseFloat(arv) || 0;
    const repairCosts = parseFloat(repairs) || 0;
    
    const mao = (afterRepairValue * 0.7) - repairCosts;
    const profitPotential = afterRepairValue - purchasePrice - repairCosts;
    const dealQuality = purchasePrice <= mao ? 'Excellent' : purchasePrice <= (mao * 1.1) ? 'Good' : 'Poor';
    
    setResults({
      mao: Math.max(0, mao),
      profitPotential,
      dealQuality,
      spread: afterRepairValue - purchasePrice
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="h-5 w-5" />
          Quick Deal Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            type="number"
            placeholder="ARV"
            value={arv}
            onChange={(e) => setArv(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Repairs"
            value={repairs}
            onChange={(e) => setRepairs(e.target.value)}
          />
        </div>
        
        <Button onClick={calculateQuick} className="w-full" size="sm">
          Calculate
        </Button>
        
        {results && (
          <div className="space-y-3 pt-2 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">MAO (70% Rule)</span>
              <span className="font-semibold">{formatCurrency(results.mao)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Profit Potential</span>
              <span className={`font-semibold ${results.profitPotential > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(results.profitPotential)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Deal Quality</span>
              <span className={`font-semibold text-sm px-2 py-1 rounded ${
                results.dealQuality === 'Excellent' ? 'bg-green-100 text-green-800' :
                results.dealQuality === 'Good' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {results.dealQuality}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickAnalysisWidget;
