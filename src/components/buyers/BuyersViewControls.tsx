
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Grid, 
  List, 
  Table, 
  Search
} from 'lucide-react';

interface BuyersViewControlsProps {
  viewMode: 'grid' | 'list' | 'table';
  setViewMode: (mode: 'grid' | 'list' | 'table') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: 'name' | 'budget' | 'created';
  setSortBy: (sort: 'name' | 'budget' | 'created') => void;
}

const BuyersViewControls = ({ 
  viewMode, 
  setViewMode, 
  searchTerm, 
  setSearchTerm, 
  sortBy, 
  setSortBy 
}: BuyersViewControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex gap-2">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('grid')}
        >
          <Grid className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('list')}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === 'table' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('table')}
        >
          <Table className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search buyers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm"
        >
          <option value="name">Sort by Name</option>
          <option value="budget">Sort by Budget</option>
          <option value="created">Sort by Date</option>
        </select>
      </div>
    </div>
  );
};

export default BuyersViewControls;
