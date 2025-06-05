
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Camera, Upload, Scan, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BusinessCardScannerProps {
  onDataExtracted: (data: any) => void;
  onSkip: () => void;
}

const BusinessCardScanner = ({ onDataExtracted, onSkip }: BusinessCardScannerProps) => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access or upload an image instead.",
        variant: "destructive"
      });
    }
  };

  const captureBusinessCard = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'business-card.jpg', { type: 'image/jpeg' });
            processBusinessCard(file);
          }
        }, 'image/jpeg', 0.8);
        
        // Stop camera
        const stream = video.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
        setIsScanning(false);
      }
    }
  };

  const processBusinessCard = async (file: File) => {
    setIsProcessing(true);
    
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processBusinessCard(file);
    }
  };

  if (isProcessing) {
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
        {!isScanning ? (
          <div className="space-y-4">
            <Button onClick={startCamera} className="w-full h-12" size="lg">
              <Camera className="h-5 w-5 mr-2" />
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
            
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm font-medium mb-2">Upload business card image</p>
              <p className="text-xs text-muted-foreground mb-3">
                PNG, JPG up to 10MB
              </p>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button 
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                Choose File
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              onClick={onSkip}
              className="w-full"
            >
              Skip - Enter Manually
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 border-2 border-white/50 rounded-lg">
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white"></div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={captureBusinessCard} className="flex-1" size="lg">
                <Camera className="h-4 w-4 mr-2" />
                Capture Card
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  const stream = videoRef.current?.srcObject as MediaStream;
                  stream?.getTracks().forEach(track => track.stop());
                  setIsScanning(false);
                }}
                size="lg"
              >
                Cancel
              </Button>
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessCardScanner;
