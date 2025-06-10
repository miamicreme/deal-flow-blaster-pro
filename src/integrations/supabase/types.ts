export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_settings: {
        Row: {
          admin_user_id: string | null
          created_at: string | null
          id: string
          is_encrypted: boolean | null
          setting_key: string
          setting_value: Json | null
          updated_at: string | null
        }
        Insert: {
          admin_user_id?: string | null
          created_at?: string | null
          id?: string
          is_encrypted?: boolean | null
          setting_key: string
          setting_value?: Json | null
          updated_at?: string | null
        }
        Update: {
          admin_user_id?: string | null
          created_at?: string | null
          id?: string
          is_encrypted?: boolean | null
          setting_key?: string
          setting_value?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_settings_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          permissions: Json | null
          role: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          permissions?: Json | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          permissions?: Json | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      buyers: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          status: string | null
          tags: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      campaign_templates: {
        Row: {
          content: string
          created_at: string
          id: string
          is_system: boolean | null
          name: string
          subject: string | null
          type: string
          updated_at: string
          user_id: string | null
          variables: Json | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_system?: boolean | null
          name: string
          subject?: string | null
          type: string
          updated_at?: string
          user_id?: string | null
          variables?: Json | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_system?: boolean | null
          name?: string
          subject?: string | null
          type?: string
          updated_at?: string
          user_id?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          click_count: number | null
          created_at: string
          deal_id: string | null
          id: string
          name: string
          open_count: number | null
          recipient_count: number | null
          reply_count: number | null
          scheduled_at: string | null
          sent_at: string | null
          status: string
          template_id: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          click_count?: number | null
          created_at?: string
          deal_id?: string | null
          id?: string
          name: string
          open_count?: number | null
          recipient_count?: number | null
          reply_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          template_id?: string | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          click_count?: number | null
          created_at?: string
          deal_id?: string | null
          id?: string
          name?: string
          open_count?: number | null
          recipient_count?: number | null
          reply_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          template_id?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_analyses: {
        Row: {
          analysis_date: string | null
          arv: number | null
          comps: Json | null
          confidence_score: number | null
          created_at: string | null
          deal_id: string | null
          gpt_notes: string | null
          gpt_summary: string | null
          id: string
          mao: number | null
          max_assignment_fee: number | null
          profit_margin: number | null
          repairs_estimate: number | null
          updated_at: string | null
        }
        Insert: {
          analysis_date?: string | null
          arv?: number | null
          comps?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          deal_id?: string | null
          gpt_notes?: string | null
          gpt_summary?: string | null
          id?: string
          mao?: number | null
          max_assignment_fee?: number | null
          profit_margin?: number | null
          repairs_estimate?: number | null
          updated_at?: string | null
        }
        Update: {
          analysis_date?: string | null
          arv?: number | null
          comps?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          deal_id?: string | null
          gpt_notes?: string | null
          gpt_summary?: string | null
          id?: string
          mao?: number | null
          max_assignment_fee?: number | null
          profit_margin?: number | null
          repairs_estimate?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deal_analyses_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          ai_analysis: Json | null
          bathrooms: number | null
          bedrooms: number | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          id: string
          images: string[] | null
          lot_size: string | null
          price: number | null
          property_address: string
          property_type: string | null
          slug: string | null
          square_feet: number | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
          year_built: number | null
        }
        Insert: {
          ai_analysis?: Json | null
          bathrooms?: number | null
          bedrooms?: number | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          lot_size?: string | null
          price?: number | null
          property_address: string
          property_type?: string | null
          slug?: string | null
          square_feet?: number | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
          year_built?: number | null
        }
        Update: {
          ai_analysis?: Json | null
          bathrooms?: number | null
          bedrooms?: number | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          lot_size?: string | null
          price?: number | null
          property_address?: string
          property_type?: string | null
          slug?: string | null
          square_feet?: number | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          year_built?: number | null
        }
        Relationships: []
      }
      follow_up_sequences: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          steps: Json
          trigger_event: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          steps?: Json
          trigger_event: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          steps?: Json
          trigger_event?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      markets: {
        Row: {
          city: string | null
          created_at: string | null
          created_by: string | null
          filters: Json | null
          id: string
          name: string
          scrape_schedule: string | null
          sources: string[] | null
          state: string | null
          status: string | null
          updated_at: string | null
          zip_codes: string[] | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          filters?: Json | null
          id?: string
          name: string
          scrape_schedule?: string | null
          sources?: string[] | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          zip_codes?: string[] | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          filters?: Json | null
          id?: string
          name?: string
          scrape_schedule?: string | null
          sources?: string[] | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          zip_codes?: string[] | null
        }
        Relationships: []
      }
      outreach_logs: {
        Row: {
          buyer_id: string | null
          channel: string | null
          content: string | null
          created_at: string | null
          deal_analysis_id: string | null
          id: string
          open_rate: number | null
          reply_text: string | null
          sent_at: string | null
          status: string | null
        }
        Insert: {
          buyer_id?: string | null
          channel?: string | null
          content?: string | null
          created_at?: string | null
          deal_analysis_id?: string | null
          id?: string
          open_rate?: number | null
          reply_text?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          buyer_id?: string | null
          channel?: string | null
          content?: string | null
          created_at?: string | null
          deal_analysis_id?: string | null
          id?: string
          open_rate?: number | null
          reply_text?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outreach_logs_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "buyers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outreach_logs_deal_analysis_id_fkey"
            columns: ["deal_analysis_id"]
            isOneToOne: false
            referencedRelation: "deal_analyses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          subscription_tier: string | null
          updated_at: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          subscription_tier?: string | null
          updated_at?: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          subscription_tier?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      property_templates: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_premium: boolean | null
          name: string
          preview_image: string | null
          template_config: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name: string
          preview_image?: string | null
          template_config: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name?: string
          preview_image?: string | null
          template_config?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
