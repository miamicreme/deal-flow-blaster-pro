
import { Deal } from '@/types/deals';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'sold': return 'bg-blue-50 text-blue-700 border-blue-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export const calculateProfit = (deal: Deal) => deal.arv - deal.price;

export const filterDeals = (deals: Deal[], searchTerm: string) => {
  return deals.filter(deal =>
    deal.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.city.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
