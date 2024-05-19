import type {Database} from '@supabase/Type'
import {createBrowserClient} from '@supabase/ssr'

const supabaseUrl = `https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.co`
export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)
