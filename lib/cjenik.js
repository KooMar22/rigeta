import { getSupabase } from './supabase'
import { CJENIK_SEED } from './cjenik-seed'

const DAN = 24 * 60 * 60 * 1000

// Cijena vrijedi od svog `vrijedi_od` do sljedećeg zapisa, pa u obzir ulaze svi zapisi
// iz zadnjih 30 dana i zadnji zapis prije toga (on je vrijedio na početku razdoblja).
function najniza30(povijest, mpc) {
  const granica = Date.now() - 30 * DAN
  const poredano = [...povijest].sort((a, b) => new Date(a.vrijedi_od) - new Date(b.vrijedi_od))
  const uRazdoblju = poredano.filter((p) => new Date(p.vrijedi_od) >= granica)
  const prije = poredano.filter((p) => new Date(p.vrijedi_od) < granica).pop()
  const cijene = [...uRazdoblju, ...(prije ? [prije] : [])].map((p) => Number(p.mpc))
  return Math.min(Number(mpc), ...cijene)
}

function dopuni(stavka, povijest = []) {
  const mpc = Number(stavka.mpc)
  const kolicina = Number(stavka.neto_kolicina)
  return {
    ...stavka,
    mpc,
    neto_kolicina: kolicina,
    mpc_posebna: stavka.mpc_posebna == null ? null : Number(stavka.mpc_posebna),
    sidrena_cijena: stavka.sidrena_cijena == null ? null : Number(stavka.sidrena_cijena),
    cijena_po_jm: kolicina > 0 ? Math.round((mpc / kolicina) * 100) / 100 : mpc,
    najniza_30d: najniza30(povijest, mpc),
  }
}

export async function getCjenik(poslovnica) {
  const supabase = getSupabase()
  if (supabase) {
    const { data, error } = await supabase
      .from('cjenik_stavke')
      .select('*, cjenik_povijest(mpc, vrijedi_od)')
      .eq('poslovnica', poslovnica)
      .eq('aktivno', true)
      .order('sifra')
    if (!error) return { izvor: 'baza', stavke: data.map((s) => dopuni(s, s.cjenik_povijest)) }
    console.error('Cjenik: čitanje iz baze nije uspjelo, koristim demo podatke.', error.message)
  }
  return { izvor: 'demo', stavke: CJENIK_SEED.map((s) => dopuni({ ...s, id: s.sifra, poslovnica })) }
}

const xmlEscape = (v) =>
  String(v ?? '').replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c])

const broj = (n) => (n == null ? '' : Number(n).toFixed(2))

const POLJA = [
  ['naziv', (s) => s.naziv],
  ['sifra', (s) => s.sifra],
  ['marka', (s) => s.marka],
  ['neto_kolicina', (s) => s.neto_kolicina],
  ['jedinica_mjere', (s) => s.jedinica_mjere],
  ['maloprodajna_cijena', (s) => broj(s.mpc)],
  ['cijena_za_jedinicu_mjere', (s) => broj(s.cijena_po_jm)],
  ['mpc_za_vrijeme_posebnog_oblika_prodaje', (s) => broj(s.mpc_posebna)],
  ['najniza_cijena_u_zadnjih_30_dana', (s) => broj(s.najniza_30d)],
  ['sidrena_cijena', (s) => broj(s.sidrena_cijena)],
  ['barkod', (s) => s.barkod],
  ['kategorija', (s) => s.kategorija],
]

export function cjenikXml({ tvrtka, poslovnica, datum, stavke }) {
  const proizvodi = stavke
    .map((s) => `    <proizvod>\n${POLJA.map(([ime, f]) => `      <${ime}>${xmlEscape(f(s))}</${ime}>`).join('\n')}\n    </proizvod>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<cjenik>
  <trgovac>${xmlEscape(tvrtka.naziv)}</trgovac>
  <poslovnica>
    <oznaka>${xmlEscape(poslovnica.slug)}</oznaka>
    <adresa>${xmlEscape(poslovnica.adresa)}</adresa>
  </poslovnica>
  <datum>${datum}</datum>
  <valuta>EUR</valuta>
  <proizvodi>
${proizvodi}
  </proizvodi>
</cjenik>
`
}

export function cjenikCsv({ stavke }) {
  const polje = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const redovi = [POLJA.map(([ime]) => ime).join(';'), ...stavke.map((s) => POLJA.map(([, f]) => polje(f(s))).join(';'))]
  // BOM da Excel ispravno prikaže dijakritike
  return '﻿' + redovi.join('\r\n') + '\r\n'
}
