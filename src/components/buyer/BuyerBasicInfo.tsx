
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

interface BuyerData {
  name: string;
  email: string;
  phone: string;
  location: string;
}

interface BuyerBasicInfoProps {
  formData: BuyerData;
  onInputChange: (field: keyof BuyerData, value: string) => void;
}

const BuyerBasicInfo = ({ formData, onInputChange }: BuyerBasicInfoProps) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-2">
          <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <CardTitle className="text-xl">Contact Information</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter the buyer's contact details
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            placeholder="John Smith"
            className="h-11"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="john@example.com"
            className="h-11"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            placeholder="(555) 123-4567"
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium">
            Location
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => onInputChange('location', e.target.value)}
            placeholder="Atlanta, GA"
            className="h-11"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyerBasicInfo;
