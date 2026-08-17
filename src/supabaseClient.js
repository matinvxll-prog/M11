import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uidqivpqylkquddbscia.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_zrDSOpognNqOhk8GYPc5UQ_xEtNzBoj'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
