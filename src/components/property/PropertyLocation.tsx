
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface PropertyData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface PropertyLocationProps {
  formData: PropertyData;
  onInputChange: (field: keyof PropertyData, value: string) => void;
}

const PropertyLocation = ({ formData, onInputChange }: PropertyLocationProps) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-2">
          <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <CardTitle className="text-xl">Property Location</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter the property address details
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-medium">
            Street Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => onInputChange('address', e.target.value)}
            placeholder="123 Main Street"
            className="h-11"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium">
              City <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => onInputChange('city', e.target.value)}
              placeholder="Atlanta"
              className="h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm font-medium">
              State <span className="text-red-500">*</span>
            </Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => onInputChange('state', e.target.value)}
              placeholder="GA"
              className="h-11 uppercase"
              maxLength={2}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="zipCode" className="text-sm font-medium">
            ZIP Code <span className="text-red-500">*</span>
          </Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => onInputChange('zipCode', e.target.value)}
            placeholder="30309"
            className="h-11"
            maxLength={5}
            required
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyLocation;
