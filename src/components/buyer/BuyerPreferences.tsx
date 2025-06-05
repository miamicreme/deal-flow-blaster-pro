
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface BuyerData {
  maxBudget: string;
  preferences: string;
}

interface BuyerPreferencesProps {
  formData: BuyerData;
  onInputChange: (field: keyof BuyerData, value: string) => void;
}

const BuyerPreferences = ({ formData, onInputChange }: BuyerPreferencesProps) => {
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    onInputChange('maxBudget', value);
  };

  const displayBudget = formData.maxBudget ? 
    formatCurrency(parseInt(formData.maxBudget)) : '';

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-2">
          <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        </div>
        <CardTitle className="text-xl">Investment Preferences</CardTitle>
        <p className="text-sm text-muted-foreground">
          Set buyer criteria and investment goals
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="maxBudget" className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Maximum Budget
          </Label>
          <Input
            id="maxBudget"
            type="text"
            value={formData.maxBudget}
            onChange={handleBudgetChange}
            placeholder="300000"
            className="h-11"
          />
          {displayBudget && (
            <p className="text-xs text-muted-foreground">
              {displayBudget}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Maximum purchase price they're willing to pay
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="preferences" className="text-sm font-medium">
            Investment Preferences
          </Label>
          <Textarea
            id="preferences"
            value={formData.preferences}
            onChange={(e) => onInputChange('preferences', e.target.value)}
            placeholder="Single family homes, 3+ bedrooms, fix & flip opportunities, specific neighborhoods..."
            className="min-h-[100px] resize-none"
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            Property types, areas, investment strategies, etc.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyerPreferences;
