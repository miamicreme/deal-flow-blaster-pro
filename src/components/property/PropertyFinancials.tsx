
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/utils/formatters';

interface PropertyData {
  price: string;
  arv: string;
  mao: string;
}

interface PropertyFinancialsProps {
  formData: PropertyData;
  onInputChange: (field: keyof PropertyData, value: string) => void;
}

const PropertyFinancials = ({ formData, onInputChange }: PropertyFinancialsProps) => {
  const { toast } = useToast();

  const calculateMAO = () => {
    const arv = parseFloat(formData.arv);
    if (arv > 0) {
      const mao = arv * 0.7 - 25000; // 70% rule minus estimated repairs
      onInputChange('mao', mao.toString());
      toast({
        title: "MAO Calculated",
        description: `Maximum Allowable Offer: ${formatCurrency(mao)}`,
      });
    }
  };

  const handleNumberInput = (field: keyof PropertyData, value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    onInputChange(field, numericValue);
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-2">
          <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <CardTitle className="text-xl">Financial Details</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter pricing and investment calculations
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="price" className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Asking Price <span className="text-red-500">*</span>
          </Label>
          <Input
            id="price"
            type="text"
            value={formData.price}
            onChange={(e) => handleNumberInput('price', e.target.value)}
            placeholder="250000"
            className="h-11"
            required
          />
          {formData.price && (
            <p className="text-xs text-muted-foreground">
              {formatCurrency(parseInt(formData.price))}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="arv" className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            ARV (After Repair Value)
          </Label>
          <Input
            id="arv"
            type="text"
            value={formData.arv}
            onChange={(e) => handleNumberInput('arv', e.target.value)}
            placeholder="350000"
            className="h-11"
          />
          {formData.arv && (
            <p className="text-xs text-muted-foreground">
              {formatCurrency(parseInt(formData.arv))}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Estimated value after repairs and improvements
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="mao" className="text-sm font-medium flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              MAO (Maximum Allowable Offer)
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={calculateMAO}
              disabled={!formData.arv}
              className="h-8"
            >
              <Calculator className="h-3 w-3 mr-1" />
              Calculate
            </Button>
          </div>
          <Input
            id="mao"
            type="text"
            value={formData.mao}
            onChange={(e) => handleNumberInput('mao', e.target.value)}
            placeholder="220000"
            className="h-11"
          />
          {formData.mao && (
            <p className="text-xs text-muted-foreground">
              {formatCurrency(parseInt(formData.mao))}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            MAO helps determine maximum offer using 70% rule
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyFinancials;
