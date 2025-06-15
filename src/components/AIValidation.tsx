
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import useOpenAI from '@/hooks/useOpenAI';
import { PropertyData, DealAnalysis } from '@/types/dealAnalysis';
import { generateFallbackAnalysis } from '@/utils/dealAnalysisUtils';
import DealAnalysisCard from '@/components/ai/DealAnalysisCard';
import ContentGenerationCard from '@/components/ai/ContentGenerationCard';

const AIValidation = ({ propertyData }: { propertyData: PropertyData }) => {
  const { toast } = useToast();
  const { analyzeProperty, isAnalyzing, analysisError, analysisData, resetAnalysis } = useOpenAI();
  const [analysis, setAnalysis] = useState<DealAnalysis | null>(null);
  const [generatedDescription, setGeneratedDescription] = useState<string>('');

  useEffect(() => {
    if (propertyData.price && propertyData.address) {
      handleAnalyzeProperty();
    }
  }, [propertyData]);

  useEffect(() => {
    if (analysisData && 'score' in analysisData) {
      setAnalysis(analysisData as DealAnalysis);
    } else if (analysisData && 'content' in analysisData) {
      setGeneratedDescription(analysisData.content);
    }
  }, [analysisData]);

  useEffect(() => {
    if (analysisError) {
      toast({
        title: "Analysis Error",
        description: "Failed to analyze property. Using fallback analysis.",
        variant: "destructive"
      });
      // Fall back to local analysis logic
      const fallbackAnalysis = generateFallbackAnalysis(propertyData);
      setAnalysis(fallbackAnalysis);
    }
  }, [analysisError, propertyData, toast]);

  const handleAnalyzeProperty = () => {
    resetAnalysis();
    analyzeProperty({ 
      propertyData, 
      analysisType: 'deal-analysis' 
    });
  };

  const handleGenerateDescription = () => {
    analyzeProperty({ 
      propertyData, 
      analysisType: 'property-description' 
    });
  };

  return (
    <div className="space-y-4">
      <DealAnalysisCard 
        analysis={analysis}
        isAnalyzing={isAnalyzing}
        onAnalyze={handleAnalyzeProperty}
      />
      
      <ContentGenerationCard 
        generatedDescription={generatedDescription}
        onGenerateDescription={handleGenerateDescription}
      />
    </div>
  );
};

export default AIValidation;
