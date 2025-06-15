
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface ContentGenerationCardProps {
  generatedDescription: string;
  onGenerateDescription: () => void;
}

const ContentGenerationCard = ({ generatedDescription, onGenerateDescription }: ContentGenerationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Content Generation
          </div>
          <Button onClick={onGenerateDescription} size="sm" variant="outline">
            Generate Description
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {generatedDescription ? (
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold mb-2">AI-Generated Description:</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {generatedDescription}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Generate an AI-powered property description for marketing materials.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentGenerationCard;
