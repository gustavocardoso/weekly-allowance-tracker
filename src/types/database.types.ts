export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          child_name: string
          child_emoji: string
          base_allowance_cents: number
          currency: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          child_name: string
          child_emoji: string
          base_allowance_cents: number
          currency?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          child_name?: string
          child_emoji?: string
          base_allowance_cents?: number
          currency?: string
          created_at?: string
          updated_at?: string
        }
      }
      situations: {
        Row: {
          id: string
          user_id: string
          name: string
          emoji: string
          type: 'reward' | 'penalty'
          amount_cents: number
          active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          emoji: string
          type: 'reward' | 'penalty'
          amount_cents: number
          active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          emoji?: string
          type?: 'reward' | 'penalty'
          amount_cents?: number
          active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      cycles: {
        Row: {
          id: string
          user_id: string
          start_date: string
          end_date: string
          status: 'open' | 'closed'
          base_amount_cents: number
          closed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          start_date: string
          end_date: string
          status?: 'open' | 'closed'
          base_amount_cents: number
          closed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          start_date?: string
          end_date?: string
          status?: 'open' | 'closed'
          base_amount_cents?: number
          closed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      entries: {
        Row: {
          id: string
          user_id: string
          cycle_id: string
          situation_id: string
          type: 'reward' | 'penalty'
          amount_cents: number
          note: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          cycle_id: string
          situation_id: string
          type: 'reward' | 'penalty'
          amount_cents: number
          note?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          cycle_id?: string
          situation_id?: string
          type?: 'reward' | 'penalty'
          amount_cents?: number
          note?: string | null
          created_at?: string
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
  }
}
