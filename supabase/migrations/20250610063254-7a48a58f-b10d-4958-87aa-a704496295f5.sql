
-- Create admin_users table with more specific fields for admin management
ALTER TABLE public.admin_users DROP COLUMN IF EXISTS role;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS email TEXT UNIQUE;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'admin';
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{"can_manage_users": true, "can_view_analytics": true, "can_manage_settings": true}'::jsonb;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Create markets table for managing scraping markets
CREATE TABLE IF NOT EXISTS public.markets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT,
  state TEXT,
  zip_codes TEXT[],
  scrape_schedule TEXT DEFAULT '0 */6 * * *', -- Every 6 hours
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'disabled')),
  sources TEXT[] DEFAULT ARRAY['zillow', 'realtor', 'craigslist'],
  filters JSONB DEFAULT '{"min_price": 0, "max_price": 500000, "property_types": ["single_family", "condo"]}'::jsonb,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create deal_analyses table for AI analysis results
CREATE TABLE IF NOT EXISTS public.deal_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE,
  arv NUMERIC,
  repairs_estimate NUMERIC,
  mao NUMERIC, -- Maximum Allowable Offer
  max_assignment_fee NUMERIC,
  profit_margin NUMERIC,
  comps JSONB, -- Comparable properties data
  gpt_summary TEXT,
  gpt_notes TEXT,
  confidence_score NUMERIC CHECK (confidence_score >= 0 AND confidence_score <= 1),
  analysis_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create outreach_logs table for tracking communications
CREATE TABLE IF NOT EXISTS public.outreach_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_analysis_id UUID REFERENCES public.deal_analyses(id),
  buyer_id UUID REFERENCES public.buyers(id),
  channel TEXT CHECK (channel IN ('email', 'sms', 'phone')),
  content TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'opened', 'clicked', 'replied', 'failed')),
  open_rate NUMERIC,
  reply_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin settings table for API keys and configurations
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES public.admin_users(id) ON DELETE CASCADE,
  setting_key TEXT NOT NULL,
  setting_value JSONB,
  is_encrypted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(admin_user_id, setting_key)
);

-- Enable RLS on all new tables
ALTER TABLE public.markets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Create admin policies for markets
CREATE POLICY "Admins can manage all markets" ON public.markets
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid()
    )
  );

-- Create admin policies for deal_analyses
CREATE POLICY "Admins can manage all deal analyses" ON public.deal_analyses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid()
    )
  );

-- Create admin policies for outreach_logs
CREATE POLICY "Admins can manage all outreach logs" ON public.outreach_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid()
    )
  );

-- Create admin policies for admin_settings
CREATE POLICY "Admins can manage their own settings" ON public.admin_settings
  FOR ALL USING (
    admin_user_id = (
      SELECT id FROM public.admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create updated_at triggers
DROP TRIGGER IF EXISTS handle_markets_updated_at ON public.markets;
CREATE TRIGGER handle_markets_updated_at 
  BEFORE UPDATE ON public.markets 
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_deal_analyses_updated_at ON public.deal_analyses;
CREATE TRIGGER handle_deal_analyses_updated_at 
  BEFORE UPDATE ON public.deal_analyses 
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_admin_settings_updated_at ON public.admin_settings;
CREATE TRIGGER handle_admin_settings_updated_at 
  BEFORE UPDATE ON public.admin_settings 
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
