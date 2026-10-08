import Hero, { PageTitle } from '@/components/Hero'
import ContactForm from '@/components/ContactForm'
import MapEmbed from '@/components/MapEmbed'
import { POSLOVNICE, TVRTKA } from '@/lib/site'

export const metadata = { title: 'Kontakt' }

export default function Kontakt() {
  return (
    <>
      <Hero slika="kontakt_hero.jpg" />

      <section className="section cream">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div>
            <PageTitle nadnaslov="Kontakt">Kontaktirajte nas</PageTitle>
            <h4>Uprava</h4>
            <p>
              {TVRTKA.naziv}
              <br />
              {TVRTKA.adresa}
              <br />
              {TVRTKA.grad}
              <br />
              <a href={`mailto:${TVRTKA.email}`}>{TVRTKA.email}</a>
            </p>
            <p>
              Tel: {TVRTKA.telefoni.map((t) => (
                <span key={t}>
                  {t}
                  <br />
                </span>
              ))}
              Fax: {TVRTKA.fax}
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <MapEmbed upit="Rigeta d.o.o., Žitnjak Bogdani 66, Zagreb" />

      <section className="section">
        <div className="container">
          <h2>Poslovnice</h2>
          <div className="stores">
            {POSLOVNICE.map((p) => (
              <div key={p.slug}>
                <h4>{p.adresa}</h4>
                <p>Tel: {p.tel}</p>
                <ul>
                  {p.radnoVrijeme.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
