
import { Users } from 'lucide-react';

interface BuyersEmptyStateProps {
  searchTerm: string;
}

const BuyersEmptyState = ({ searchTerm }: BuyersEmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        {searchTerm ? 'No buyers found' : 'No buyers yet'}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {searchTerm 
          ? 'Try adjusting your search terms' 
          : 'Add buyers to your list to start sending targeted deal emails'
        }
      </p>
    </div>
  );
};

export default BuyersEmptyState;
