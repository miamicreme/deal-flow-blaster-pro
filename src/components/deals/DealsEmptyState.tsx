
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface DealsEmptyStateProps {
  searchTerm: string;
  onCreateDeal: () => void;
}

const DealsEmptyState = ({ searchTerm, onCreateDeal }: DealsEmptyStateProps) => {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-medium text-slate-900 mb-2">
          {searchTerm ? 'No deals found' : 'Start building your portfolio'}
        </h3>
        <p className="text-slate-600 mb-6">
          {searchTerm 
            ? 'Try adjusting your search terms'
            : 'Create your first deal to begin attracting serious investors'
          }
        </p>
        {!searchTerm && (
          <Button 
            onClick={onCreateDeal}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create First Deal
          </Button>
        )}
      </div>
    </div>
  );
};

export default DealsEmptyState;
