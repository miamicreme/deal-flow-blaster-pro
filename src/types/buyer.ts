
export interface Buyer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  user_id: string;
  notes: string | null;
  tags: string[] | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}

export interface BuyersViewProps {
  buyers: Buyer[];
  onEdit: (buyer: Buyer) => void;
  onDelete: (id: string) => void;
  onEmail: (buyer: Buyer) => void;
}
