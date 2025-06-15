
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Calculator, Plus } from 'lucide-react';

interface DealsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onShowAnalyzer: () => void;
  onNavigateDashboard: () => void;
  onCreateDeal: () => void;
}

const DealsHeader = ({ 
  searchTerm, 
  onSearchChange, 
  onShowAnalyzer, 
  onNavigateDashboard, 
  onCreateDeal 
}: DealsHeaderProps) => {
  return (
    <div className="mb-8">
      <Button 
        variant="ghost" 
        onClick={onNavigateDashboard}
        className="mb-6 text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Dashboard
      </Button>
      
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-light text-slate-900 mb-2">Deal Portfolio</h1>
          <p className="text-slate-600 text-lg">Manage your investment opportunities with AI analysis</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-full sm:w-80 border-0 bg-white shadow-sm"
            />
          </div>
          
          <Button 
            onClick={onShowAnalyzer}
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Deal Analyzer
          </Button>
          
          <Button 
            onClick={onCreateDeal}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Deal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DealsHeader;
