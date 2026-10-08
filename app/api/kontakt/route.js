import { getSupabase } from '@/lib/supabase'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const tekst = (v, max) => String(v ?? '').trim().slice(0, max)

export async function POST(request) {
  let podaci
  try {
    podaci = await request.json()
  } catch {
    return Response.json({ greska: 'Neispravan zahtjev.' }, { status: 400 })
  }

  // honeypot: botu vraćamo "uspjeh", ali ništa ne spremamo
  if (podaci.website) return Response.json({ ok: true })

  const ime = tekst(podaci.ime, 120)
  const email = tekst(podaci.email, 160)
  const telefon = tekst(podaci.telefon, 40)
  const poruka = tekst(podaci.poruka, 4000)

  if (!ime || !poruka || !EMAIL.test(email)) {
    return Response.json({ greska: 'Molimo ispunite ime, ispravan e-mail i poruku.' }, { status: 400 })
  }
  if (podaci.privola !== 'da') {
    return Response.json({ greska: 'Potrebna je suglasnost s pravilima privatnosti.' }, { status: 400 })
  }

  const supabase = getSupabase()
  if (!supabase) return Response.json({ ok: true, demo: true })

  const { error } = await supabase.from('poruke').insert({ ime, email, telefon: telefon || null, poruka })
  if (error) {
    console.error('Kontakt forma:', error.message)
    return Response.json({ greska: 'Poruku trenutno nije moguće spremiti. Pokušajte kasnije.' }, { status: 500 })
  }
  return Response.json({ ok: true })
}
