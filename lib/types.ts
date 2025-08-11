export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      logs: {
        Row: {
          created_at: string
          id: number
          level: string
          message: string
          meta: Json | null
        }
        Insert: {
          created_at?: string
          id?: number
          level?: string
          message: string
          meta?: Json | null
        }
        Update: {
          created_at?: string
          id?: number
          level?: string
          message?: string
          meta?: Json | null
        }
        Relationships: []
      }
      ping_pong_tables: {
        Row: {
          id: string
          name: string
          status: "inactive" | "active" | "warning" | "overtime"
          table_type: "ping_pong" | "dining"
          layout_x: number
          layout_y: number
          layout_w: number
          layout_h: number
        }
        Insert: {
          id?: string
          name: string
          status?: "inactive" | "active" | "warning" | "overtime"
          table_type?: "ping_pong" | "dining"
          layout_x?: number
          layout_y?: number
          layout_w?: number
          layout_h?: number
        }
        Update: {
          id?: string
          name?: string
          status?: "inactive" | "active" | "warning" | "overtime"
          table_type?: "ping_pong" | "dining"
          layout_x?: number
          layout_y?: number
          layout_w?: number
          layout_h?: number
        }
        Relationships: []
      }
      sessions: {
        Row: {
          created_at: string
          end_time: string | null
          guest_count: number
          id: string
          notes: string | null
          server_name: string | null
          start_time: string
          table_id: string
        }
        Insert: {
          created_at?: string
          end_time?: string | null
          guest_count?: number
          id?: string
          notes?: string | null
          server_name?: string | null
          start_time?: string
          table_id: string
        }
        Update: {
          created_at?: string
          end_time?: string | null
          guest_count?: number
          id?: string
          notes?: string | null
          server_name?: string | null
          start_time?: string
          table_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "ping_pong_tables"
            referencedColumns: ["id"]
          },
        ]
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

export type Table = Database["public"]["Tables"]["ping_pong_tables"]["Row"]
export type Session = Database["public"]["Tables"]["sessions"]["Row"]
