
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AdminUser } from '@/types/admin';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAdmin(false);
        setAdminUser(null);
        return;
      }

      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (error) {
        console.log('User is not an admin:', error);
        setIsAdmin(false);
        setAdminUser(null);
        return;
      }

      setIsAdmin(true);
      setAdminUser(data);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      setAdminUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const adminLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await checkAdminStatus();
        if (isAdmin) {
          toast({
            title: "Welcome Admin",
            description: "Successfully logged in to admin dashboard",
          });
          return { success: true };
        } else {
          await supabase.auth.signOut();
          throw new Error("Access denied. Admin privileges required.");
        }
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials or insufficient privileges",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const adminLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAdmin(false);
      setAdminUser(null);
      toast({
        title: "Logged Out",
        description: "Successfully logged out of admin dashboard",
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    isAdmin,
    adminUser,
    loading,
    adminLogin,
    adminLogout,
    checkAdminStatus
  };
};
