
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface PropertyData {
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

interface DealAnalysisResult {
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

interface ContentGenerationResult {
  content: string;
}

type AnalysisType = 'deal-analysis' | 'property-description' | 'market-insights';

const useOpenAI = () => {
  const analyzeProperty = useMutation({
    mutationFn: async ({ 
      propertyData, 
      analysisType 
    }: { 
      propertyData: PropertyData; 
      analysisType: AnalysisType;
    }): Promise<DealAnalysisResult | ContentGenerationResult> => {
      const { data, error } = await supabase.functions.invoke('openai-property-analysis', {
        body: { propertyData, analysisType },
      });

      if (error) {
        throw new Error(error.message || 'Failed to analyze property');
      }

      return data;
    },
  });

  return {
    analyzeProperty: analyzeProperty.mutate,
    isAnalyzing: analyzeProperty.isPending,
    analysisError: analyzeProperty.error,
    analysisData: analyzeProperty.data,
    resetAnalysis: analyzeProperty.reset,
  };
};

export default useOpenAI;
