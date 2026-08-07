/**
 * Hand-written to match supabase/migrations/0001_init.sql. If the schema
 * changes, update this alongside the migration (or regenerate via
 * `supabase gen types typescript` once the Supabase CLI is linked).
 */
export interface Database {
  public: {
    Tables: {
      resources: {
        Row: {
          id: string;
          name: string;
          description: string;
          resource_type: string;
          website_url: string | null;
          phone_number: string | null;
          city: string | null;
          state: string | null;
          virtual_available: boolean;
          cost_category: string;
          verified_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          resource_type: string;
          website_url?: string | null;
          phone_number?: string | null;
          city?: string | null;
          state?: string | null;
          virtual_available?: boolean;
          cost_category: string;
          verified_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          resource_type?: string;
          website_url?: string | null;
          phone_number?: string | null;
          city?: string | null;
          state?: string | null;
          virtual_available?: boolean;
          cost_category?: string;
          verified_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      saved_resources: {
        Row: {
          id: string;
          user_id: string;
          resource_id: string | null;
          status: string;
          private_notes: string;
          created_at: string;
          updated_at: string;
          source: string;
          external_place_id: string | null;
          external_name: string | null;
          external_address: string | null;
          external_resource_type: string | null;
          external_maps_url: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string;
          resource_id?: string | null;
          status?: string;
          private_notes?: string;
          created_at?: string;
          updated_at?: string;
          source?: string;
          external_place_id?: string | null;
          external_name?: string | null;
          external_address?: string | null;
          external_resource_type?: string | null;
          external_maps_url?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          resource_id?: string | null;
          status?: string;
          private_notes?: string;
          created_at?: string;
          updated_at?: string;
          source?: string;
          external_place_id?: string | null;
          external_name?: string | null;
          external_address?: string | null;
          external_resource_type?: string | null;
          external_maps_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "saved_resources_resource_id_fkey";
            columns: ["resource_id"];
            isOneToOne: false;
            referencedRelation: "resources";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
