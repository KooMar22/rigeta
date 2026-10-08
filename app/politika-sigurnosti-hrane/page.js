import { PageTitle } from '@/components/Hero'
import { img } from '@/lib/site'

export const metadata = { title: 'Politika sigurnosti hrane' }

export default function PolitikaSigurnostiHrane() {
  return (
    <section className="section page-plain">
      <div className="container narrow">
        <PageTitle nadnaslov="Kvaliteta">Politika sigurnosti hrane</PageTitle>
        <p className="notice">
          Demo verzija: ovdje dolazi tekst nove politike sigurnosti hrane koju dostavlja naručitelj.
        </p>
        <p>
          Najvažnija stavka našeg poslovanja je proizvodnja kvalitetnog i zdravstveno ispravnog proizvoda. Do objave
          nove politike dostupan je važeći dokument.
        </p>
        <a className="btn btn-outline" href={img('politika_sigurnosti_hrane.pdf')} target="_blank" rel="noopener">
          Važeća politika sigurnosti hrane (PDF)
        </a>
      </div>
    </section>
  )
}
