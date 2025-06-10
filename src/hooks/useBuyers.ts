
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Buyer } from '@/types/buyer';

export const useBuyers = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchBuyers = async () => {
    try {
      const { data, error } = await supabase
        .from('buyers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBuyers(data || []);
    } catch (error) {
      console.error('Error fetching buyers:', error);
      toast({
        title: "Error",
        description: "Failed to load buyers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteBuyer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('buyers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBuyers(prev => prev.filter(buyer => buyer.id !== id));
      toast({
        title: "Success",
        description: "Buyer deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting buyer:', error);
      toast({
        title: "Error",
        description: "Failed to delete buyer",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  return {
    buyers,
    loading,
    fetchBuyers,
    deleteBuyer
  };
};
