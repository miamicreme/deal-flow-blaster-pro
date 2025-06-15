
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, Home, DollarSign, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DealAnalyzerProps {
  propertyData?: {
    price?: number;
    address?: string;
    sqft?: number;
    bedrooms?: number;
    bathrooms?: number;
  };
  onAnalysisComplete?: (analysis: any) => void;
}

const DealAnalyzer = ({ propertyData, onAnalysisComplete }: DealAnalyzerProps) => {
  const { toast } = useToast();
  const [analysisData, setAnalysisData] = useState({
    price: propertyData?.price || '',
    sqft: propertyData?.sqft || '',
    bedrooms: propertyData?.bedrooms || '',
    bathrooms: propertyData?.bathrooms || '',
    repairCosts: '',
    holdingCosts: ''
  });

  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const calculateARV = () => {
    const price = parseFloat(analysisData.price.toString());
    const sqft = parseFloat(analysisData.sqft.toString());
    
    if (!price || !sqft) return 0;
    
    // Simple ARV calculation based on market multipliers
    const pricePerSqft = price / sqft;
    const marketMultiplier = 1.15; // 15% market appreciation
    const arvPerSqft = pricePerSqft * marketMultiplier;
    
    return Math.round(arvPerSqft * sqft);
  };

  const calculateMAO = () => {
    const arv = calculateARV();
    const repairCosts = parseFloat(analysisData.repairCosts.toString()) || 0;
    const holdingCosts = parseFloat(analysisData.holdingCosts.toString()) || 5000;
    
    // 70% rule for wholesale deals
    const mao = (arv * 0.7) - repairCosts - holdingCosts;
    return Math.max(0, Math.round(mao));
  };

  const generateComps = () => {
    const price = parseFloat(analysisData.price.toString());
    const sqft = parseFloat(analysisData.sqft.toString());
    
    if (!price || !sqft) return [];
    
    const pricePerSqft = price / sqft;
    
    return [
      {
        address: "123 Similar St",
        price: Math.round(price * 0.95),
        sqft: Math.round(sqft * 1.05),
        pricePerSqft: Math.round((price * 0.95) / (sqft * 1.05)),
        soldDate: "2024-01-15",
        status: "Sold"
      },
      {
        address: "456 Comparable Ave",
        price: Math.round(price * 1.08),
        sqft: Math.round(sqft * 0.98),
        pricePerSqft: Math.round((price * 1.08) / (sqft * 0.98)),
        soldDate: "2024-01-08",
        status: "Sold"
      },
      {
        address: "789 Market Rd",
        price: Math.round(price * 1.02),
        sqft: Math.round(sqft * 1.02),
        pricePerSqft: Math.round((price * 1.02) / (sqft * 1.02)),
        soldDate: "2023-12-20",
        status: "Sold"
      }
    ];
  };

  const runAnalysis = () => {
    setLoading(true);
    
    setTimeout(() => {
      const arv = calculateARV();
      const mao = calculateMAO();
      const comps = generateComps();
      const price = parseFloat(analysisData.price.toString());
      
      const analysisResult = {
        arv,
        mao,
        comps,
        profitPotential: arv - price,
        dealScore: price <= mao ? 85 : price <= (mao * 1.1) ? 70 : 45,
        recommendation: price <= mao ? 'Strong Buy' : price <= (mao * 1.1) ? 'Consider' : 'Pass'
      };
      
      setAnalysis(analysisResult);
      onAnalysisComplete?.(analysisResult);
      setLoading(false);
      
      toast({
        title: "Analysis Complete",
        description: "Deal analysis has been generated successfully",
      });
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Deal Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Purchase Price</Label>
              <Input
                id="price"
                type="number"
                value={analysisData.price}
                onChange={(e) => setAnalysisData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="250000"
              />
            </div>
            <div>
              <Label htmlFor="sqft">Square Feet</Label>
              <Input
                id="sqft"
                type="number"
                value={analysisData.sqft}
                onChange={(e) => setAnalysisData(prev => ({ ...prev, sqft: e.target.value }))}
                placeholder="1500"
              />
            </div>
            <div>
              <Label htmlFor="repairCosts">Repair Costs</Label>
              <Input
                id="repairCosts"
                type="number"
                value={analysisData.repairCosts}
                onChange={(e) => setAnalysisData(prev => ({ ...prev, repairCosts: e.target.value }))}
                placeholder="25000"
              />
            </div>
            <div>
              <Label htmlFor="holdingCosts">Holding Costs</Label>
              <Input
                id="holdingCosts"
                type="number"
                value={analysisData.holdingCosts}
                onChange={(e) => setAnalysisData(prev => ({ ...prev, holdingCosts: e.target.value }))}
                placeholder="5000"
              />
            </div>
          </div>
          
          <Button onClick={runAnalysis} disabled={loading} className="w-full">
            {loading ? 'Analyzing...' : 'Run Deal Analysis'}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <>
          {/* Analysis Results */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">ARV</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(analysis.arv)}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">MAO</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(analysis.mao)}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Profit Potential</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(analysis.profitPotential)}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">Deal Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">{analysis.dealScore}/100</div>
                  <Badge 
                    variant={analysis.dealScore >= 80 ? "default" : analysis.dealScore >= 60 ? "secondary" : "destructive"}
                  >
                    {analysis.recommendation}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparables */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Comparables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.comps.map((comp: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{comp.address}</div>
                      <div className="text-sm text-gray-600">{comp.sqft} sq ft • Sold {comp.soldDate}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatCurrency(comp.price)}</div>
                      <div className="text-sm text-gray-600">${comp.pricePerSqft}/sq ft</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default DealAnalyzer;
