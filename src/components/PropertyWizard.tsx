
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Home, Upload, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PropertyData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: string;
  arv: string;
  mao: string;
  description: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  yearBuilt: string;
  lotSize: string;
  images: File[];
}

const PropertyWizard = ({ onComplete }: { onComplete: (data: PropertyData) => void }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PropertyData>({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    price: '',
    arv: '',
    mao: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    yearBuilt: '',
    lotSize: '',
    images: []
  });

  const totalSteps = 4;

  const handleInputChange = (field: keyof PropertyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const calculateMAO = () => {
    const arv = parseFloat(formData.arv);
    if (arv > 0) {
      const mao = arv * 0.7 - 25000; // 70% rule minus estimated repairs
      handleInputChange('mao', mao.toString());
      toast({
        title: "MAO Calculated",
        description: `Maximum Allowable Offer: $${mao.toLocaleString()}`,
      });
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
              <Home className="h-12 w-12 mx-auto mb-2 text-blue-600" />
              <h2 className="text-xl font-semibold">Property Location</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Start by entering the property address
              </p>
            </div>
            
            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="123 Main Street"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Atlanta"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="GA"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                placeholder="30309"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Calculator className="h-12 w-12 mx-auto mb-2 text-green-600" />
              <h2 className="text-xl font-semibold">Financial Details</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter pricing and investment calculations
              </p>
            </div>
            
            <div>
              <Label htmlFor="price">Asking Price *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="250000"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="arv">ARV (After Repair Value)</Label>
              <Input
                id="arv"
                type="number"
                value={formData.arv}
                onChange={(e) => handleInputChange('arv', e.target.value)}
                placeholder="350000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Estimated value after repairs and improvements
              </p>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="mao">MAO (Maximum Allowable Offer)</Label>
                <Input
                  id="mao"
                  type="number"
                  value={formData.mao}
                  onChange={(e) => handleInputChange('mao', e.target.value)}
                  placeholder="220000"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={calculateMAO}
                className="mt-6"
                disabled={!formData.arv}
              >
                <Calculator className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              MAO helps determine maximum offer using 70% rule
            </p>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Home className="h-12 w-12 mx-auto mb-2 text-purple-600" />
              <h2 className="text-xl font-semibold">Property Features</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add physical characteristics of the property
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                  placeholder="3"
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                  placeholder="2"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sqft">Square Feet</Label>
                <Input
                  id="sqft"
                  type="number"
                  value={formData.sqft}
                  onChange={(e) => handleInputChange('sqft', e.target.value)}
                  placeholder="1500"
                />
              </div>
              <div>
                <Label htmlFor="yearBuilt">Year Built</Label>
                <Input
                  id="yearBuilt"
                  type="number"
                  value={formData.yearBuilt}
                  onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                  placeholder="1985"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="lotSize">Lot Size (acres)</Label>
              <Input
                id="lotSize"
                type="number"
                step="0.01"
                value={formData.lotSize}
                onChange={(e) => handleInputChange('lotSize', e.target.value)}
                placeholder="0.25"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Property Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the property condition, features, and investment opportunity..."
                rows={3}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Upload className="h-12 w-12 mx-auto mb-2 text-orange-600" />
              <h2 className="text-xl font-semibold">Property Images</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add photos to showcase the property
              </p>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Click to upload property images
              </p>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="images"
              />
              <Button 
                type="button" 
                variant="outline"
                onClick={() => document.getElementById('images')?.click()}
              >
                Choose Files
              </Button>
              {formData.images.length > 0 && (
                <p className="text-sm text-green-600 mt-2">
                  {formData.images.length} file(s) selected
                </p>
              )}
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
          <CardTitle className="text-lg">Add Property</CardTitle>
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

export default PropertyWizard;
