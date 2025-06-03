
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Edit, 
  Trash2,
  User,
  Mail
} from 'lucide-react';
import { BuyersViewProps } from '@/types/buyer';
import { formatCurrency } from '@/utils/formatters';

const BuyersTableView = ({ buyers, onEdit, onDelete, onEmail }: BuyersViewProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Location</th>
                <th className="p-4 font-semibold">Budget</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer) => (
                <tr key={buyer.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium">{buyer.name}</div>
                        <div className="text-sm text-gray-500">{buyer.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{buyer.email}</td>
                  <td className="p-4 text-sm">{buyer.location}</td>
                  <td className="p-4 text-sm font-medium">{formatCurrency(buyer.maxBudget)}</td>
                  <td className="p-4">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyersTableView;
