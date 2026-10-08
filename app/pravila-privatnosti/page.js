import Link from 'next/link'
import { PageTitle } from '@/components/Hero'
import { TVRTKA } from '@/lib/site'

export const metadata = { title: 'Pravila privatnosti' }

export default function PravilaPrivatnosti() {
  return (
    <section className="section page-plain">
      <div className="container narrow">
        <PageTitle>Pravila privatnosti</PageTitle>
        <p className="notice">
          Demo verzija: ovdje se prenosi postojeći tekst pravila privatnosti društva, dopunjen dijelom o kolačićima.
        </p>
        <p>
          Voditelj obrade je {TVRTKA.naziv}, {TVRTKA.adresa}, {TVRTKA.grad}. Podatke koje nam pošaljete putem kontakt
          forme koristimo isključivo za odgovor na Vaš upit, a podatke i životopis poslane putem forme za posao
          isključivo u svrhu selekcijskog postupka.
        </p>
        <p>
          Podaci se ne ustupaju trećim stranama, osim pružateljima usluge smještaja stranice i baze podataka koji ih
          obrađuju u naše ime. O korištenju kolačića pročitajte u <Link href="/kolacici">politici kolačića</Link>.
        </p>
        <p>
          Zahtjev za uvid, ispravak ili brisanje podataka možete poslati na{' '}
          <a href={`mailto:${TVRTKA.email}`}>{TVRTKA.email}</a>.
        </p>
      </div>
    </section>
  )
}
