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
          name: string
          email: string
          created_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          created_at?: string
        }
      }
      analysis_history: {
        Row: {
          id: string
          user_id: string
          symptoms: string
          result: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          symptoms: string
          result: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          symptoms?: string
          result?: Json
          created_at?: string
        }
      }
    }
  }
}