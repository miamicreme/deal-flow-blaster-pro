
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Edit, 
  Trash2,
  MapPin,
  User,
  Mail,
  Tag
} from 'lucide-react';
import { BuyersViewProps } from '@/types/buyer';

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
                  <CardDescription className="text-sm">{buyer.email || 'No email'}</CardDescription>
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
            {buyer.phone && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{buyer.phone}</span>
              </div>
            )}
            
            {buyer.status && (
              <div className="flex items-center gap-2 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  buyer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {buyer.status}
                </span>
              </div>
            )}

            {buyer.tags && buyer.tags.length > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <Tag className="h-4 w-4 text-gray-500" />
                <div className="flex flex-wrap gap-1">
                  {buyer.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {buyer.tags.length > 2 && (
                    <span className="text-xs text-gray-500">+{buyer.tags.length - 2}</span>
                  )}
                </div>
              </div>
            )}
            
            {buyer.notes && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p className="line-clamp-2">{buyer.notes}</p>
              </div>
            )}
            
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
