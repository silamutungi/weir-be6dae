export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
      matches: {
        Row: Match
        Insert: Omit<Match, 'id' | 'created_at'>
        Update: Partial<Omit<Match, 'id' | 'created_at'>>
      }
      licenses: {
        Row: License
        Insert: Omit<License, 'id' | 'created_at'>
        Update: Partial<Omit<License, 'id' | 'created_at'>>
      }
      earnings: {
        Row: Earning
        Insert: Omit<Earning, 'id' | 'created_at'>
        Update: Partial<Omit<Earning, 'id' | 'created_at'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export interface Profile {
  id: string
  user_id: string
  display_name: string
  username: string
  bio: string | null
  platform_handles: Json
  tier: 'free' | 'creator' | 'pro'
  created_at: string
  deleted_at: string | null
}

export type MatchStatus = 'pending' | 'approved' | 'takedown' | 'monetized'
export type RiskLevel = 'low' | 'medium' | 'high'

export interface Match {
  id: string
  user_id: string
  platform: string
  url: string
  thumbnail_url: string | null
  title: string
  detected_at: string
  status: MatchStatus
  risk_level: RiskLevel
  cpm_rate: number | null
  estimated_earnings: number | null
  created_at: string
  deleted_at: string | null
}

export interface License {
  id: string
  user_id: string
  name: string
  description: string
  allowed_platforms: string[]
  requires_approval: boolean
  commercial_use: boolean
  duration_days: number | null
  created_at: string
  deleted_at: string | null
}

export interface Earning {
  id: string
  user_id: string
  match_id: string | null
  platform: string
  amount: number
  cpm_rate: number
  period_start: string
  period_end: string
  status: 'pending' | 'paid'
  created_at: string
  deleted_at: string | null
}
