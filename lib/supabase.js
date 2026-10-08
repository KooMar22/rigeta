import { createClient } from '@supabase/supabase-js'

let client

// Vraća null ako Supabase nije konfiguriran - stranica tada radi u demo načinu
// (cjenik iz lib/cjenik-seed.js, forme ne spremaju podatke).
export function getSupabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  client ??= createClient(url, key, { auth: { persistSession: false } })
  return client
}

export const CV_BUCKET = 'zivotopisi'
