// Supabase client - Configurar después cuando sea necesario
// import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// export const supabase = createClient(supabaseUrl, supabaseKey)

// Placeholder mientras tanto
export const supabase = {
  auth: {},
  from: () => ({}),
}
