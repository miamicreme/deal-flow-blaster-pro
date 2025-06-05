
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Calendar, Ruler } from 'lucide-react';

interface PropertyData {
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  yearBuilt: string;
  lotSize: string;
  description: string;
}

interface PropertyFeaturesProps {
  formData: PropertyData;
  onInputChange: (field: keyof PropertyData, value: string) => void;
}

const PropertyFeatures = ({ formData, onInputChange }: PropertyFeaturesProps) => {
  const handleNumberInput = (field: keyof PropertyData, value: string) => {
    if (field === 'bathrooms' || field === 'lotSize') {
      // Allow decimals for bathrooms and lot size
      const numericValue = value.replace(/[^\d.]/g, '');
      onInputChange(field, numericValue);
    } else {
      // Only integers for other fields
      const numericValue = value.replace(/[^\d]/g, '');
      onInputChange(field, numericValue);
    }
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-2">
          <Home className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        </div>
        <CardTitle className="text-xl">Property Features</CardTitle>
        <p className="text-sm text-muted-foreground">
          Add physical characteristics and details
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bedrooms" className="text-sm font-medium">
              Bedrooms
            </Label>
            <Input
              id="bedrooms"
              type="text"
              value={formData.bedrooms}
              onChange={(e) => handleNumberInput('bedrooms', e.target.value)}
              placeholder="3"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bathrooms" className="text-sm font-medium">
              Bathrooms
            </Label>
            <Input
              id="bathrooms"
              type="text"
              value={formData.bathrooms}
              onChange={(e) => handleNumberInput('bathrooms', e.target.value)}
              placeholder="2.5"
              className="h-11"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sqft" className="text-sm font-medium flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              Square Feet
            </Label>
            <Input
              id="sqft"
              type="text"
              value={formData.sqft}
              onChange={(e) => handleNumberInput('sqft', e.target.value)}
              placeholder="1500"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="yearBuilt" className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Year Built
            </Label>
            <Input
              id="yearBuilt"
              type="text"
              value={formData.yearBuilt}
              onChange={(e) => handleNumberInput('yearBuilt', e.target.value)}
              placeholder="1985"
              className="h-11"
              maxLength={4}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lotSize" className="text-sm font-medium">
            Lot Size (acres)
          </Label>
          <Input
            id="lotSize"
            type="text"
            value={formData.lotSize}
            onChange={(e) => handleNumberInput('lotSize', e.target.value)}
            placeholder="0.25"
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Property Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            placeholder="Describe the property condition, features, and investment opportunity..."
            className="min-h-[100px] resize-none"
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyFeatures;
