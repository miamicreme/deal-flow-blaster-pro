
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scan, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CameraCapture from './CameraCapture';
import FileUpload from './FileUpload';
import ProcessingState from './ProcessingState';

interface BusinessCardScannerProps {
  onDataExtracted: (data: any) => void;
  onSkip: () => void;
}

const BusinessCardScanner = ({ onDataExtracted, onSkip }: BusinessCardScannerProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const processBusinessCard = async (file: File) => {
    setIsProcessing(true);
    setShowCamera(false);
    
    toast({
      title: "Processing Business Card",
      description: "Extracting contact information...",
    });

    // Simulate OCR processing - integrate with OCR service in production
    setTimeout(() => {
      const extractedData = {
        name: 'John Investor',
        email: 'john@investor.com',
        phone: '(555) 123-4567',
        location: 'Atlanta, GA'
      };
      
      onDataExtracted(extractedData);
      setIsProcessing(false);
      
      toast({
        title: "Information Extracted",
        description: "Contact details have been filled automatically.",
        action: <CheckCircle className="h-4 w-4 text-green-600" />
      });
    }, 2000);
  };

  const handleCameraError = () => {
    toast({
      title: "Camera Access Denied",
      description: "Please allow camera access or upload an image instead.",
      variant: "destructive"
    });
    setShowCamera(false);
  };

  if (isProcessing) {
    return <ProcessingState />;
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-2">
          <Scan className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <CardTitle className="text-xl">Business Card Scanner</CardTitle>
        <p className="text-sm text-muted-foreground">
          Scan or upload a business card to auto-fill contact info
        </p>
      </CardHeader>
      
      <CardContent>
        {showCamera ? (
          <CameraCapture
            onCapture={processBusinessCard}
            onCancel={() => setShowCamera(false)}
          />
        ) : (
          <div className="space-y-4">
            <Button 
              onClick={() => setShowCamera(true)} 
              className="w-full h-12" 
              size="lg"
            >
              Use Camera
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>
            
            <FileUpload onFileSelect={processBusinessCard} />
            
            <Button 
              variant="ghost" 
              onClick={onSkip}
              className="w-full"
            >
              Skip - Enter Manually
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessCardScanner;
