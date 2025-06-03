
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

const BuyersListView = ({ buyers, onEdit, onDelete, onEmail }: BuyersViewProps) => {
  return (
    <div className="space-y-3">
      {buyers.map((buyer) => (
        <Card key={buyer.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg">{buyer.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{buyer.email}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {buyer.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {formatCurrency(buyer.maxBudget)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => onEmail(buyer)}>
                  <Mail className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => onEdit(buyer)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => onDelete(buyer.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BuyersListView;
