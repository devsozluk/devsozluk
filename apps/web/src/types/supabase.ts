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
          author: string
          content: string
          created_at: string | null
          downvotes: number | null
          id: number
          topic: number
          upvotes: number | null
        }
        Insert: {
          author: string
          content: string
          created_at?: string | null
          downvotes?: number | null
          id?: number
          topic: number
          upvotes?: number | null
        }
        Update: {
          author?: string
          content?: string
          created_at?: string | null
          downvotes?: number | null
          id?: number
          topic?: number
          upvotes?: number | null
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
          author: string
          created_at: string | null
          entryCount: number | null
          id: number
          slug: string | null
          title: string | null
          viewsCount: number | null
        }
        Insert: {
          author: string
          created_at?: string | null
          entryCount?: number | null
          id?: number
          slug?: string | null
          title?: string | null
          viewsCount?: number | null
        }
        Update: {
          author?: string
          created_at?: string | null
          entryCount?: number | null
          id?: number
          slug?: string | null
          title?: string | null
          viewsCount?: number | null
        }
      }
      votes_entry: {
        Row: {
          author: string
          createdat: string | null
          downvoted: boolean | null
          entry: number
          id: number
          upvoted: boolean | null
        }
        Insert: {
          author: string
          createdat?: string | null
          downvoted?: boolean | null
          entry: number
          id?: number
          upvoted?: boolean | null
        }
        Update: {
          author?: string
          createdat?: string | null
          downvoted?: boolean | null
          entry?: number
          id?: number
          upvoted?: boolean | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_view_count: {
        Args: {
          topic_slug: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
