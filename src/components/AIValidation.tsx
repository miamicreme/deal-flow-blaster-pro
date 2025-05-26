
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

interface PropertyData {
  address: string;
  price: string;
  arv: string;
  mao: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
}

interface DealAnalysis {
  score: number;
  rating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  confidence: number;
  factors: Array<{
    factor: string;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
  }>;
  recommendation: string;
}

const AIValidation = ({ propertyData }: { propertyData: PropertyData }) => {
  const [analysis, setAnalysis] = useState<DealAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const analyzeProperty = async () => {
      setIsLoading(true);
      
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const price = parseFloat(propertyData.price);
      const arv = parseFloat(propertyData.arv);
      const mao = parseFloat(propertyData.mao);
      
      let score = 50; // Base score
      const factors = [];
      
      // Analyze price vs ARV
      if (arv > 0 && price > 0) {
        const spread = arv - price;
        const spreadPercent = (spread / arv) * 100;
        
        if (spreadPercent > 30) {
          score += 25;
          factors.push({
            factor: 'Price Spread',
            impact: 'positive' as const,
            description: `Excellent spread of ${spreadPercent.toFixed(1)}% between price and ARV`
          });
        } else if (spreadPercent > 20) {
          score += 15;
          factors.push({
            factor: 'Price Spread',
            impact: 'positive' as const,
            description: `Good spread of ${spreadPercent.toFixed(1)}% between price and ARV`
          });
        } else if (spreadPercent < 10) {
          score -= 20;
          factors.push({
            factor: 'Price Spread',
            impact: 'negative' as const,
            description: `Tight margins with only ${spreadPercent.toFixed(1)}% spread`
          });
        }
      }
      
      // Analyze MAO vs asking price
      if (mao > 0 && price > 0) {
        if (price <= mao) {
          score += 20;
          factors.push({
            factor: 'MAO Analysis',
            impact: 'positive' as const,
            description: 'Asking price is within Maximum Allowable Offer'
          });
        } else {
          const overage = ((price - mao) / mao) * 100;
          score -= Math.min(25, overage);
          factors.push({
            factor: 'MAO Analysis',
            impact: 'negative' as const,
            description: `Asking price exceeds MAO by ${overage.toFixed(1)}%`
          });
        }
      }
      
      // Property size analysis
      const sqft = parseFloat(propertyData.sqft);
      if (sqft > 0) {
        const pricePerSqft = price / sqft;
        if (pricePerSqft < 80) {
          score += 10;
          factors.push({
            factor: 'Price per Sq Ft',
            impact: 'positive' as const,
            description: `Low price per sq ft at $${pricePerSqft.toFixed(0)}`
          });
        } else if (pricePerSqft > 150) {
          score -= 10;
          factors.push({
            factor: 'Price per Sq Ft',
            impact: 'negative' as const,
            description: `High price per sq ft at $${pricePerSqft.toFixed(0)}`
          });
        }
      }
      
      // Market factors (simulated)
      const marketFactors = [
        { factor: 'Market Trend', impact: 'positive', description: 'Local market showing upward trend' },
        { factor: 'Days on Market', impact: 'neutral', description: 'Property has been listed for 45 days' },
        { factor: 'Comparable Sales', impact: 'positive', description: 'Recent comps support ARV estimate' }
      ];
      
      factors.push(...marketFactors);
      score += 5; // Market bonus
      
      // Determine rating
      let rating: DealAnalysis['rating'];
      if (score >= 80) rating = 'Excellent';
      else if (score >= 65) rating = 'Good';
      else if (score >= 45) rating = 'Fair';
      else rating = 'Poor';
      
      // Generate recommendation
      let recommendation = '';
      if (score >= 80) {
        recommendation = 'Strong deal with excellent potential. Recommend moving forward quickly.';
      } else if (score >= 65) {
        recommendation = 'Good investment opportunity. Consider negotiating price if possible.';
      } else if (score >= 45) {
        recommendation = 'Marginal deal. Proceed with caution and thorough due diligence.';
      } else {
        recommendation = 'Poor investment metrics. Consider passing unless significant improvements can be made.';
      }
      
      setAnalysis({
        score: Math.max(0, Math.min(100, score)),
        rating,
        confidence: Math.min(95, 70 + Math.random() * 25),
        factors,
        recommendation
      });
      
      setIsLoading(false);
    };

    if (propertyData.price && propertyData.arv) {
      analyzeProperty();
    }
  }, [propertyData]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI Deal Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 65) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Excellent': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Fair': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Poor': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI Deal Analysis
          </div>
          <Badge className={getRatingColor(analysis.rating)}>
            {analysis.rating}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Deal Score</span>
          <span className={`text-2xl font-bold ${getScoreColor(analysis.score)}`}>
            {analysis.score}/100
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              analysis.score >= 80 ? 'bg-green-500' :
              analysis.score >= 65 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${analysis.score}%` }}
          />
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Confidence: {analysis.confidence.toFixed(0)}%
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold">Key Factors:</h4>
          {analysis.factors.slice(0, 3).map((factor, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              {factor.impact === 'positive' ? (
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              ) : factor.impact === 'negative' ? (
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              ) : (
                <TrendingUp className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <span className="font-medium">{factor.factor}:</span>
                <span className="ml-1">{factor.description}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-1">Recommendation:</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {analysis.recommendation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIValidation;
