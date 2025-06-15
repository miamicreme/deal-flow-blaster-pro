
export interface Deal {
  id: string;
  address: string;
  city: string;
  state: string;
  price: number;
  arv: number;
  status: 'active' | 'sold' | 'pending';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  created_at: string;
}

export type DealStatus = 'active' | 'sold' | 'pending';
