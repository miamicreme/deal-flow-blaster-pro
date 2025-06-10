
-- Create admin roles table only if it doesn't exist
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on admin_users if not already enabled
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create admin policy only if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'admin_users' 
    AND policyname = 'Admins can view all admin users'
  ) THEN
    EXECUTE 'CREATE POLICY "Admins can view all admin users" ON public.admin_users
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM public.admin_users au 
          WHERE au.user_id = auth.uid()
        )
      )';
  END IF;
END $$;

-- Update deals table to store more data
ALTER TABLE public.deals ADD COLUMN IF NOT EXISTS contact_name TEXT;
ALTER TABLE public.deals ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE public.deals ADD COLUMN IF NOT EXISTS contact_phone TEXT;
ALTER TABLE public.deals ADD COLUMN IF NOT EXISTS ai_analysis JSONB;

-- Add admin policies for buyers and deals only if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'buyers' 
    AND policyname = 'Admins can view all buyers'
  ) THEN
    EXECUTE 'CREATE POLICY "Admins can view all buyers" ON public.buyers
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM public.admin_users au 
          WHERE au.user_id = auth.uid()
        )
      )';
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'deals' 
    AND policyname = 'Admins can view all deals'
  ) THEN
    EXECUTE 'CREATE POLICY "Admins can view all deals" ON public.deals
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM public.admin_users au 
          WHERE au.user_id = auth.uid()
        )
      )';
  END IF;
END $$;

-- Note: To make a user an admin, you'll need to:
-- 1. First sign up the user through your app
-- 2. Then manually insert their user_id into the admin_users table
-- Example: INSERT INTO public.admin_users (user_id) VALUES ('actual-user-uuid-here');
