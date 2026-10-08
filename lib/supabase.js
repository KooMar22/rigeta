import { createClient } from '@supabase/supabase-js'

let client
let greska = null

// Vraća null ako Supabase nije konfiguriran - stranica tada radi u demo načinu
// (cjenik iz lib/cjenik-seed.js, forme ne spremaju podatke).
export function getSupabase() {
  const url = process.env.SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !key) {
    greska = 'Nedostaje SUPABASE_URL ili SUPABASE_SERVICE_ROLE_KEY.'
    return null
  }
  if (client) return client
  try {
    // createClient baca iznimku ako URL nije ispravnog oblika (https://xxxx.supabase.co)
    client = createClient(url, key, { auth: { persistSession: false } })
    greska = null
    return client
  } catch (e) {
    greska = `Neispravna Supabase konfiguracija: ${e.message}`
    console.error(greska)
    return null
  }
}

// razlog zašto getSupabase() vraća null; prikazuje se samo u /admin
export const supabaseGreska = () => greska

export const CV_BUCKET = 'zivotopisi'
