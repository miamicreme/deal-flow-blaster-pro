
import { useState } from 'react';
import { Buyer, BuyersViewProps } from '@/types/buyer';
import BuyersGridView from '@/components/buyers/BuyersGridView';
import BuyersListView from '@/components/buyers/BuyersListView';
import BuyersTableView from '@/components/buyers/BuyersTableView';
import BuyersEmptyState from '@/components/buyers/BuyersEmptyState';
import BuyersViewControls from '@/components/buyers/BuyersViewControls';

const BuyersViewOptions = ({ buyers, onEdit, onDelete, onEmail }: BuyersViewProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'created'>('name');

  const filteredBuyers = buyers
    .filter(buyer => 
      buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (buyer.email && buyer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (buyer.phone && buyer.phone.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'email':
          return (a.email || '').localeCompare(b.email || '');
        case 'created':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const viewProps = {
    buyers: filteredBuyers,
    onEdit,
    onDelete,
    onEmail
  };

  return (
    <div className="space-y-4">
      <BuyersViewControls
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {viewMode === 'grid' && <BuyersGridView {...viewProps} />}
      {viewMode === 'list' && <BuyersListView {...viewProps} />}
      {viewMode === 'table' && <BuyersTableView {...viewProps} />}
      
      {filteredBuyers.length === 0 && (
        <BuyersEmptyState searchTerm={searchTerm} />
      )}
    </div>
  );
};

export default BuyersViewOptions;
