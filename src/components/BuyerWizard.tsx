
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Users, Camera, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BuyerData {
  name: string;
  email: string;
  phone: string;
  location: string;
  maxBudget: string;
  preferences: string;
  businessCard?: File;
}

const BuyerWizard = ({ onComplete }: { onComplete: (data: BuyerData) => void }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BuyerData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    maxBudget: '',
    preferences: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);

  const totalSteps = 3;

  const handleInputChange = (field: keyof BuyerData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
        title: "Camera Error",
        description: "Unable to access camera. Please upload an image instead.",
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
            setFormData(prev => ({ ...prev, businessCard: file }));
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
    // Simulate OCR processing - in real app, integrate with OCR service
    toast({
      title: "Processing Business Card",
      description: "Extracting contact information...",
    });

    // Mock OCR results after 2 seconds
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        name: 'John Investor',
        email: 'john@investor.com',
        phone: '(555) 123-4567',
        location: 'Atlanta, GA'
      }));
      
      toast({
        title: "Information Extracted",
        description: "Contact details have been filled automatically. Please review and confirm.",
      });
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, businessCard: file }));
      processBusinessCard(file);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Camera className="h-12 w-12 mx-auto mb-2 text-blue-600" />
              <h2 className="text-xl font-semibold">Business Card Scanner</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scan or upload a business card to auto-fill contact info
              </p>
            </div>
            
            {!isScanning ? (
              <div className="space-y-4">
                <Button onClick={startCamera} className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Use Camera
                </Button>
                
                <div className="text-center">
                  <span className="text-sm text-gray-500">or</span>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Upload business card image
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
                  >
                    Choose File
                  </Button>
                </div>
                
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentStep(2)}
                  className="w-full"
                >
                  Skip - Enter Manually
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-lg"
                />
                <div className="flex gap-2">
                  <Button onClick={captureBusinessCard} className="flex-1">
                    Capture Card
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      const stream = videoRef.current?.srcObject as MediaStream;
                      stream?.getTracks().forEach(track => track.stop());
                      setIsScanning(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Users className="h-12 w-12 mx-auto mb-2 text-green-600" />
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter or confirm buyer contact details
              </p>
            </div>
            
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Smith"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Atlanta, GA"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Users className="h-12 w-12 mx-auto mb-2 text-purple-600" />
              <h2 className="text-xl font-semibold">Investment Preferences</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Set buyer criteria and preferences
              </p>
            </div>
            
            <div>
              <Label htmlFor="maxBudget">Maximum Budget</Label>
              <Input
                id="maxBudget"
                type="number"
                value={formData.maxBudget}
                onChange={(e) => handleInputChange('maxBudget', e.target.value)}
                placeholder="300000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Maximum purchase price they're willing to pay
              </p>
            </div>
            
            <div>
              <Label htmlFor="preferences">Investment Preferences</Label>
              <Input
                id="preferences"
                value={formData.preferences}
                onChange={(e) => handleInputChange('preferences', e.target.value)}
                placeholder="Single family homes, 3+ bedrooms, fix & flip"
              />
              <p className="text-xs text-gray-500 mt-1">
                Property types, areas, investment strategies, etc.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Add Buyer</CardTitle>
          <span className="text-sm text-gray-500">
            {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        {renderStep()}
        
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button onClick={nextStep}>
            {currentStep === totalSteps ? 'Complete' : 'Next'}
            {currentStep < totalSteps && <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyerWizard;
