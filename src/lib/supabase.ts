
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'operator' | 'viewer';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      materials: {
        Row: {
          id: string;
          name: string;
          type: string;
          unit: string;
          current_stock: number;
          min_stock: number;
          location: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['materials']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['materials']['Insert']>;
      };
      machinery: {
        Row: {
          id: string;
          name: string;
          type: string;
          model: string;
          status: 'active' | 'maintenance' | 'inactive';
          location: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['machinery']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['machinery']['Insert']>;
      };
      movements: {
        Row: {
          id: string;
          type: 'entrada' | 'salida' | 'transferencia';
          material_id: string;
          machinery_id?: string;
          quantity: number;
          origin?: string;
          destination?: string;
          user_id: string;
          notes?: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['movements']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['movements']['Insert']>;
      };
    };
  };
}
