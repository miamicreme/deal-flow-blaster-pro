
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Edit, 
  Trash2,
  MapPin,
  DollarSign,
  User,
  Mail
} from 'lucide-react';
import { BuyersViewProps } from '@/types/buyer';
import { formatCurrency } from '@/utils/formatters';

const BuyersGridView = ({ buyers, onEdit, onDelete, onEmail }: BuyersViewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {buyers.map((buyer) => (
        <Card key={buyer.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">{buyer.name}</CardTitle>
                  <CardDescription className="text-sm">{buyer.email}</CardDescription>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => onEdit(buyer)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => onDelete(buyer.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{buyer.location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span>{formatCurrency(buyer.maxBudget)}</span>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="line-clamp-2">{buyer.preferences}</p>
            </div>
            
            <Button 
              size="sm" 
              className="w-full mt-3"
              onClick={() => onEmail(buyer)}
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BuyersGridView;
