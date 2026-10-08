import Link from 'next/link'
import Hero, { PageTitle } from '@/components/Hero'
import { img } from '@/lib/site'

export const metadata = { title: 'Kvaliteta' }

const CERTIFIKATI = [
  { slika: 'ifs.jpg', alt: 'IFS Food' },
  { slika: 'haccp.jpg', alt: 'HACCP' },
  { slika: 'hr2933eu.jpg', alt: 'Odobreni objekt HR 2933 EU' },
  { slika: 'ISO-9001-ISO-14001_en_electricblue-Pantone293C-300x300.jpg', alt: 'ISO 9001 i ISO 14001' },
  { slika: 'HR-Sufinancira-Europska-unija_POS-1.jpg', alt: 'Sufinancira Europska unija' },
]

export default function Kvaliteta() {
  return (
    <>
      <Hero slika="kvaliteta_hero.jpg" />

      <section className="section">
        <div className="container split">
          <div>
            <PageTitle nadnaslov="Obilježje kojim se ponosimo">Kvaliteta</PageTitle>
            <p>
              Najvažnija stavka našeg poslovanja je proizvodnja kvalitetnog i zdravstveno ispravnog proizvoda. Ne samo
              da smo certificirani od strane vanjskih agencija za kvalitetu po IFS Food, već i osiguravamo kontinuirane
              edukacije naših djelatnika vezane za kvalitetu, higijenu i zaštitu na radu.
            </p>
            <Link className="btn btn-outline" href="/politika-sigurnosti-hrane">
              Politika sigurnosti hrane
            </Link>
          </div>
          <img src={img('meso_zdjelica.jpg')} alt="" loading="lazy" />
        </div>
      </section>

      <section className="section cream">
        <div className="container split reverse">
          <img src={img('meso_rezano.jpg')} alt="" loading="lazy" />
          <p>
            O kvaliteti Vam možemo reći mnogo, ali certifikat IFS Food na višoj razini govori sam za sebe. Dodatnu
            potvrdu pružaju certifikati ISO 9001 i ISO 14001, ostvareni uz sufinanciranje fondova Europske unije.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container logos">
          {CERTIFIKATI.map((c) => (
            <img key={c.slika} src={img(c.slika)} alt={c.alt} loading="lazy" />
          ))}
        </div>
      </section>
    </>
  )
}
