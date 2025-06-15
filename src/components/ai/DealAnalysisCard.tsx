
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, TrendingUp, RefreshCw, Sparkles } from 'lucide-react';
import { DealAnalysis } from '@/types/dealAnalysis';
import { getScoreColor, getRatingColor } from '@/utils/dealAnalysisUtils';

interface DealAnalysisCardProps {
  analysis: DealAnalysis | null;
  isAnalyzing: boolean;
  onAnalyze: () => void;
}

const DealAnalysisCard = ({ analysis, isAnalyzing, onAnalyze }: DealAnalysisCardProps) => {
  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 animate-pulse" />
            AI Deal Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            AI is analyzing your property deal...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Deal Analysis
            </div>
            <Button onClick={onAnalyze} size="sm" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Analyze
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Click analyze to get AI-powered insights about this deal.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Deal Analysis
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getRatingColor(analysis.rating)}>
              {analysis.rating}
            </Badge>
            <Button onClick={onAnalyze} size="sm" variant="outline">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
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
          AI Confidence: {analysis.confidence.toFixed(0)}%
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
          <h4 className="font-semibold mb-1">AI Recommendation:</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {analysis.recommendation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealAnalysisCard;
