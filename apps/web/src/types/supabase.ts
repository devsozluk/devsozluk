export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          id: string;
          name: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string | null;
          id: string;
          name?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string | null;
          id?: string;
          name?: string | null;
          username?: string | null;
        };
      };
      topics: {
        Row: {
          created_at: string;
          id: number;
          title: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          title?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          title?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
