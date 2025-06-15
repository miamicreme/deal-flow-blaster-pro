
import { PropertyData, DealAnalysis } from '@/types/dealAnalysis';

export const generateFallbackAnalysis = (propertyData: PropertyData): DealAnalysis => {
  const price = parseFloat(propertyData.price);
  const arv = parseFloat(propertyData.arv);
  const mao = parseFloat(propertyData.mao);
  
  let score = 50;
  const factors = [];
  
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

  let rating: DealAnalysis['rating'];
  if (score >= 80) rating = 'Excellent';
  else if (score >= 65) rating = 'Good';
  else if (score >= 45) rating = 'Fair';
  else rating = 'Poor';

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

  return {
    score: Math.max(0, Math.min(100, score)),
    rating,
    confidence: 75,
    factors,
    recommendation
  };
};

export const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 65) return 'text-yellow-600';
  return 'text-red-600';
};

export const getRatingColor = (rating: string) => {
  switch (rating) {
    case 'Excellent': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'Good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'Fair': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'Poor': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};
