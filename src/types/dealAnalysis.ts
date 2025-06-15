
export interface PropertyData {
  address: string;
  city: string;
  state: string;
  price: string;
  arv: string;
  mao: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  yearBuilt: string;
  lotSize: string;
  description: string;
}

export interface DealAnalysis {
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
