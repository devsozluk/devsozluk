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
      entries: {
        Row: {
          author: string | null
          content: string | null
          created_at: string | null
          id: number
          topic: number | null
        }
        Insert: {
          author?: string | null
          content?: string | null
          created_at?: string | null
          id?: number
          topic?: number | null
        }
        Update: {
          author?: string | null
          content?: string | null
          created_at?: string | null
          id?: number
          topic?: number | null
        }
      }
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
          author: string | null
          created_at: string | null
          entryCount: number | null
          id: number
          slug: string | null
          title: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          entryCount?: number | null
          id?: number
          slug?: string | null
          title?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string | null
          entryCount?: number | null
          id?: number
          slug?: string | null
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
