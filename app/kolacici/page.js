import { PageTitle } from '@/components/Hero'
import { CookieSettingsButton } from '@/components/CookieBanner'
import { TVRTKA } from '@/lib/site'

export const metadata = { title: 'Politika kolačića' }

export default function Kolacici() {
  return (
    <section className="section page-plain">
      <div className="container narrow">
        <PageTitle>Politika kolačića</PageTitle>
        <p className="notice">Nacrt teksta za demo verziju – prije objave potrebna je pravna provjera naručitelja.</p>

        <h3>Što su kolačići?</h3>
        <p>
          Kolačići su male tekstualne datoteke koje internetska stranica sprema na Vaš uređaj. Slične tehnologije, poput
          lokalne pohrane preglednika, služe istoj svrsi. Koriste se kako bi stranica ispravno radila i zapamtila Vaše
          postavke.
        </p>

        <h3>Što koristimo na ovoj stranici?</h3>
        <div className="table-wrap" style={{ marginBottom: '1.4em' }}>
          <table>
            <thead>
              <tr>
                <th>Naziv</th>
                <th>Vrsta</th>
                <th>Svrha</th>
                <th>Trajanje</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>rigeta-kolacici</td>
                <td>Nužni (lokalna pohrana)</td>
                <td className="wrap">Pamti Vaš odabir o kolačićima kako Vas ne bismo ponovno pitali.</td>
                <td>Do brisanja</td>
              </tr>
              <tr>
                <td>Google Maps</td>
                <td>Vanjski sadržaj</td>
                <td className="wrap">
                  Prikaz karte na stranici Kontakt. Učitava se tek nakon Vašeg pristanka; Google pritom može postaviti
                  vlastite kolačiće prema svojim pravilima.
                </td>
                <td>Prema pravilima Googlea</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Stranica ne koristi analitičke ni marketinške kolačiće.</p>

        <h3>Kako upravljati pristankom?</h3>
        <p>
          Svoj odabir možete promijeniti u bilo kojem trenutku: <CookieSettingsButton />. Kolačiće možete obrisati ili
          blokirati i u postavkama svog preglednika.
        </p>

        <h3>Kontakt</h3>
        <p>
          Za sva pitanja o kolačićima i zaštiti osobnih podataka obratite nam se na{' '}
          <a href={`mailto:${TVRTKA.email}`}>{TVRTKA.email}</a>.
        </p>
      </div>
    </section>
  )
}
