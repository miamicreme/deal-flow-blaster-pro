
export interface AdminUser {
  id: string;
  user_id: string | null;
  email: string | null;
  full_name: string | null;
  role: string | null;
  permissions: Record<string, boolean> | null;
  last_login: string | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Market {
  id: string;
  name: string;
  city: string | null;
  state: string | null;
  zip_codes: string[] | null;
  scrape_schedule: string | null;
  status: string | null;
  sources: string[] | null;
  filters: Record<string, any> | null;
  created_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface DealAnalysis {
  id: string;
  deal_id: string | null;
  arv: number | null;
  repairs_estimate: number | null;
  mao: number | null;
  max_assignment_fee: number | null;
  profit_margin: number | null;
  comps: Record<string, any> | null;
  gpt_summary: string | null;
  gpt_notes: string | null;
  confidence_score: number | null;
  analysis_date: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface OutreachLog {
  id: string;
  deal_analysis_id: string | null;
  buyer_id: string | null;
  channel: string | null;
  content: string | null;
  sent_at: string | null;
  status: string | null;
  open_rate: number | null;
  reply_text: string | null;
  created_at: string | null;
}

export interface AdminSetting {
  id: string;
  admin_user_id: string | null;
  setting_key: string;
  setting_value: Record<string, any> | null;
  is_encrypted: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}
