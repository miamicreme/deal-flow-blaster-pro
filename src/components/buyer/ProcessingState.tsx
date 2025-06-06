
import { Card, CardContent } from '@/components/ui/card';

const ProcessingState = () => {
  return (
    <Card className="border-0 shadow-none">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h3 className="text-lg font-semibold mb-2">Processing Business Card</h3>
        <p className="text-sm text-muted-foreground text-center">
          Extracting contact information using AI...
        </p>
      </CardContent>
    </Card>
  );
};

export default ProcessingState;
