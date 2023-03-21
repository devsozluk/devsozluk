export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          name: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          name?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          username?: string | null
        }
      }
      topics: {
        Row: {
          author: string
          created_at: string
          entryCount: number | null
          id: number
          slug: string
          title: string | null
        }
        Insert: {
          author: string
          created_at?: string
          entryCount?: number | null
          id?: number
          slug: string
          title?: string | null
        }
        Update: {
          author?: string
          created_at?: string
          entryCount?: number | null
          id?: number
          slug?: string
          title?: string | null
        }
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
