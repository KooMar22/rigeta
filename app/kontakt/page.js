import Hero, { PageTitle } from '@/components/Hero'
import ContactForm from '@/components/ContactForm'
import MapEmbed from '@/components/MapEmbed'
import { POSLOVNICE, TVRTKA, UPRAVA, telHref } from '@/lib/site'

export const metadata = { title: 'Kontakt' }

const Nedostaje = ({ sto }) => <span className="todo">{sto} – dostavlja naručitelj</span>

export default function Kontakt() {
  return (
    <>
      <Hero slika="kontakt_hero.jpg" />

      <section className="section cream">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div>
            <PageTitle nadnaslov="Kontakt">Kontaktirajte nas</PageTitle>
            <p>
              Imate pitanje, prijedlog ili želite više informacija? Ispunite kontakt formu i javit ćemo Vam se u
              najkraćem mogućem roku.
            </p>
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
              Tel:{' '}
              {TVRTKA.telefoni.map((t) => (
                <span key={t}>
                  <a href={telHref(t)}>{t}</a>
                  <br />
                </span>
              ))}
              Fax: {TVRTKA.fax}
            </p>
            <p>Radno vrijeme: {UPRAVA.radnoVrijeme ?? <Nedostaje sto="Radno vrijeme uprave" />}</p>
            <ul className="plain-list">
              {UPRAVA.odjeli.map((o) => (
                <li key={o.naziv}>
                  {o.naziv}: {o.tel ? <a href={telHref(o.tel)}>{o.tel}</a> : <Nedostaje sto="Broj" />}
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>

      <MapEmbed upit="Rigeta d.o.o., Žitnjak Bogdani 66, Zagreb" />

      <section className="section">
        <div className="container narrow">
          <h2>Poslovnice</h2>
          <div className="accordion">
            {POSLOVNICE.map((p) => (
              <details key={p.slug}>
                <summary>{p.adresa}</summary>
                <div className="accordion-body">
                  <p>
                    Tel: <a href={telHref(p.tel)}>{p.tel}</a>
                  </p>
                  <p style={{ marginBottom: 4 }}>Radno vrijeme:</p>
                  <ul className="plain-list">
                    {p.radnoVrijeme.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
