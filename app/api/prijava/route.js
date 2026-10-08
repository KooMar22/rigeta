import { randomUUID } from 'crypto'
import { CV_BUCKET, getSupabase } from '@/lib/supabase'
import { danasZagreb } from '@/lib/site'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_VELICINA = 4 * 1024 * 1024
const TIPOVI = {
  pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}
const tekst = (v, max) => String(v ?? '').trim().slice(0, max)

export async function POST(request) {
  let podaci
  try {
    podaci = await request.formData()
  } catch {
    return Response.json({ greska: 'Neispravan zahtjev.' }, { status: 400 })
  }

  if (podaci.get('website')) return Response.json({ ok: true })

  const ime = tekst(podaci.get('ime'), 120)
  const email = tekst(podaci.get('email'), 160)
  const telefon = tekst(podaci.get('telefon'), 40)
  const radnoMjesto = tekst(podaci.get('radno_mjesto'), 120)
  const poruka = tekst(podaci.get('poruka'), 4000)
  const cv = podaci.get('cv')

  if (!ime || !EMAIL.test(email)) {
    return Response.json({ greska: 'Molimo ispunite ime i ispravan e-mail.' }, { status: 400 })
  }
  if (podaci.get('privola') !== 'da') {
    return Response.json({ greska: 'Potrebna je suglasnost s pravilima privatnosti.' }, { status: 400 })
  }
  if (!cv || typeof cv === 'string' || cv.size === 0) {
    return Response.json({ greska: 'Molimo priložite životopis.' }, { status: 400 })
  }
  const ekstenzija = cv.name.split('.').pop().toLowerCase()
  if (!TIPOVI[ekstenzija]) {
    return Response.json({ greska: 'Životopis mora biti u pdf ili docx formatu.' }, { status: 400 })
  }
  if (cv.size > MAX_VELICINA) {
    return Response.json({ greska: 'Životopis je veći od 4 MB.' }, { status: 400 })
  }

  const supabase = getSupabase()
  if (!supabase) return Response.json({ ok: true, demo: true })

  const putanja = `${danasZagreb()}/${randomUUID()}.${ekstenzija}`
  const upload = await supabase.storage
    .from(CV_BUCKET)
    .upload(putanja, Buffer.from(await cv.arrayBuffer()), { contentType: TIPOVI[ekstenzija] })
  if (upload.error) {
    console.error('Prijava za posao (upload):', upload.error.message)
    return Response.json({ greska: 'Životopis trenutno nije moguće spremiti. Pokušajte kasnije.' }, { status: 500 })
  }

  const { error } = await supabase.from('prijave').insert({
    ime,
    email,
    telefon: telefon || null,
    radno_mjesto: radnoMjesto || null,
    poruka: poruka || null,
    cv_putanja: putanja,
    cv_naziv: tekst(cv.name, 200),
  })
  if (error) {
    console.error('Prijava za posao:', error.message)
    await supabase.storage.from(CV_BUCKET).remove([putanja])
    return Response.json({ greska: 'Prijavu trenutno nije moguće spremiti. Pokušajte kasnije.' }, { status: 500 })
  }
  return Response.json({ ok: true })
}
