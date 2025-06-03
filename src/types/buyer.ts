
export interface Buyer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  maxBudget: number;
  preferences: string;
  created_at: string;
}

export interface BuyersViewProps {
  buyers: Buyer[];
  onEdit: (buyer: Buyer) => void;
  onDelete: (id: string) => void;
  onEmail: (buyer: Buyer) => void;
}
