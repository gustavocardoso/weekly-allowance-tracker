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
          emoji: string
          base_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          child_name: string
          emoji: string
          base_amount: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          child_name?: string
          emoji?: string
          base_amount?: number
          created_at?: string
          updated_at?: string
        }
      }
      situations: {
        Row: {
          id: number
          user_id: string
          name: string
          emoji: string
          type: 'reward' | 'penalty'
          amount: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          name: string
          emoji: string
          type: 'reward' | 'penalty'
          amount: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          name?: string
          emoji?: string
          type?: 'reward' | 'penalty'
          amount?: number
          is_active?: boolean
          created_at?: string
        }
      }
      cycles: {
        Row: {
          id: number
          user_id: string
          start_date: string
          end_date: string
          base_amount: number
          is_closed: boolean
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          start_date: string
          end_date: string
          base_amount: number
          is_closed?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          start_date?: string
          end_date?: string
          base_amount?: number
          is_closed?: boolean
          created_at?: string
        }
      }
      entries: {
        Row: {
          id: number
          user_id: string
          cycle_id: number
          situation_id: number
          amount: number
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          cycle_id: number
          situation_id: number
          amount: number
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          cycle_id?: number
          situation_id?: number
          amount?: number
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
