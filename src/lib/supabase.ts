import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Database {
  public: {
    Tables: {
      machinery: {
        Insert: Omit<
          Database["public"]["Tables"]["machinery"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Row: {
          created_at: string;
          id: string;
          location: string;
          model: string;
          name: string;
          status: "active" | "maintenance" | "inactive";
          type: string;
          updated_at: string;
        };
        Update: Partial<Database["public"]["Tables"]["machinery"]["Insert"]>;
      };
      materials: {
        Insert: Omit<
          Database["public"]["Tables"]["materials"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Row: {
          created_at: string;
          current_stock: number;
          id: string;
          location: string;
          min_stock: number;
          name: string;
          type: string;
          unit: string;
          updated_at: string;
        };
        Update: Partial<Database["public"]["Tables"]["materials"]["Insert"]>;
      };
      movements: {
        Insert: Omit<
          Database["public"]["Tables"]["movements"]["Row"],
          "id" | "created_at"
        >;
        Row: {
          created_at: string;
          destination?: string;
          id: string;
          machinery_id?: string;
          material_id: string;
          notes?: string;
          origin?: string;
          quantity: number;
          type: "entrada" | "salida" | "transferencia";
          user_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["movements"]["Insert"]>;
      };
      users: {
        Insert: Omit<
          Database["public"]["Tables"]["users"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Row: {
          created_at: string;
          email: string;
          id: string;
          name: string;
          role: "admin" | "operator" | "viewer";
          updated_at: string;
        };
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
      };
    };
  };
}
