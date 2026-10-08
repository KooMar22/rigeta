// Slike se u demo verziji učitavaju izravno s postojeće stranice.
// Za produkciju ih treba prebaciti u /public i ovdje promijeniti ASSET_BASE u ''.
export const ASSET_BASE = 'https://rigeta.hr/wp-content/uploads'
export const img = (name) => `${ASSET_BASE}/${name}`

export const NAV = [
  { href: '/o-nama', label: 'o nama' },
  { href: '/kvaliteta', label: 'kvaliteta' },
  { href: '/proizvodi', label: 'proizvodi' },
  { href: '/cjenici', label: 'cjenici' },
  { href: '/kontakt', label: 'kontakt' },
  { href: '/posao', label: 'posao' },
]

export const TVRTKA = {
  naziv: 'RIGETA d.o.o.',
  adresa: 'Žitnjak Bogdani 66',
  grad: '10000 Zagreb',
  email: 'rigeta@rigeta.hr',
  telefoni: ['+385 (0)1 2404 117', '+385 (0)1 2406 518', '+385 (0)1 2406 515'],
  fax: '+385 (0)1 2404 112',
}

// null = podatak dostavlja naručitelj
export const UPRAVA = {
  radnoVrijeme: null,
  odjeli: [
    { naziv: 'Računovodstvo', tel: null },
    { naziv: 'Prodaja', tel: null },
    { naziv: 'Kontrola kvalitete', tel: null },
  ],
}

// Redoslijed prikaza: Žitnjak, Utrine, Čikoševa. `slug` se koristi u bazi i u adresi cjenika.
export const POSLOVNICE = [
  {
    slug: 'zitnjak',
    naziv: 'Žitnjak',
    adresa: 'Žitnjak Bogdani 66, Zagreb',
    tel: '+385 (0)1 2406 517',
    radnoVrijeme: ['pon – pet: 7:00 – 15:00', 'sub: 7:00 – 13:00'],
  },
  {
    slug: 'utrine',
    naziv: 'Utrine',
    adresa: 'Barčev trg 16 (tržnica Utrine), Zagreb',
    tel: '+385 (0)1 2306 996',
    radnoVrijeme: ['uto – sub: 7:00 – 14:00', 'ned: 7:00 – 13:00', 'pon: zatvoreno'],
  },
  {
    slug: 'maksimir',
    naziv: 'Čikoševa',
    adresa: 'Ulica Bele Čikoša 2 (ulaz s Maksimirske ceste), Zagreb',
    tel: '+385 (0)1 2306 993',
    radnoVrijeme: ['pon – pet: 7:00 – 19:00', 'sub: 7:00 – 14:00'],
  },
]

export const PREDMETI_UPITA = ['Opći upit', 'Prodaja i veleprodaja', 'Poslovnice', 'Kvaliteta i reklamacije', 'Ostalo']

// null = podatak još nije dostavljen; na stranici se prikazuje kao označeno prazno polje.
export const EU_PROJEKTI = [
  {
    naziv: 'Izgradnja i opremanje sunčane elektrane',
    fond: 'Europski poljoprivredni fond za ruralni razvoj',
    opis: 'Korištenjem električne energije proizvedene iz vlastitih obnovljivih izvora smještenih na preko 550 m² površine našeg pogona smanjujemo negativan utjecaj na okoliš. Projekt je djelomično sufinanciran sredstvima Europskog poljoprivrednog fonda za ruralni razvoj.',
    slika: 'solarni_krov.jpg',
    ukupnaVrijednost: null,
    iznosPotpore: null,
    razdoblje: null,
  },
  {
    naziv: 'Uvođenje sustava upravljanja ISO 9001 i ISO 14001',
    fond: 'Sufinancira Europska unija',
    opis: 'Certifikati ISO 9001 i ISO 14001 ostvareni su uz sufinanciranje fondova Europske unije i dodatna su potvrda naše svakodnevne težnje vrhunskoj kvaliteti i brizi za okoliš.',
    slika: 'ISO-9001-ISO-14001_en_electricblue-Pantone293C-300x300.jpg',
    ukupnaVrijednost: null,
    iznosPotpore: null,
    razdoblje: null,
  },
  {
    naziv: null,
    fond: null,
    opis: null,
    slika: null,
    ukupnaVrijednost: null,
    iznosPotpore: null,
    razdoblje: null,
  },
]

// "+385 (0)1 2404 117" -> "tel:+38512404117"
export const telHref = (broj) => `tel:${broj.replace('(0)', '').replace(/[^\d+]/g, '')}`

export function danasZagreb() {
  // 'sv-SE' daje ISO oblik YYYY-MM-DD
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Zagreb' }).format(new Date())
}

export function formatDatum(iso) {
  const [g, m, d] = iso.split('-').map(Number)
  return `${d}. ${m}. ${g}.`
}

export const eur = (n) => (n == null ? '–' : `${Number(n).toFixed(2).replace('.', ',')} €`)
