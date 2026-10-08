import Link from 'next/link'
import Hero, { PageTitle } from '@/components/Hero'
import { EU_PROJEKTI, img } from '@/lib/site'

export const metadata = { title: 'O nama' }

const Nedostaje = ({ sto }) => <span className="todo">{sto} – dostavlja naručitelj</span>

export default function ONama() {
  return (
    <>
      <Hero slika="o_nama_hero.jpg" />

      <section className="section">
        <div className="container narrow">
          <PageTitle nadnaslov="Naša priča">O nama</PageTitle>
          <p>
            Društvo se kao osnovnom djelatnošću bavi rasijecanjem, obradom, pakiranjem i skladištenjem mesa, a ulaznu
            sirovinu – razne vrste mesa (juneće, svinjsko, teleće, janjeće) nabavlja na tržištu Hrvatske i EU. Iz malog
            skladišta na Savici Šanci u Zagrebu, RIGETA d.o.o. je izrasla u respektabilnu tvrtku za rasijecanje, obradu,
            pakiranje i skladištenje mesa, s vlastitim kompletno novoopremljenim pogonom.
          </p>
          <p>
            Također, društvo raspolaže i sa suvremenom opremom za osiguranje adekvatnog rashladnog režima u svim
            prostorijama gdje se manipulira mesom kao i modernim voznim parkom opremljenim s rashladnim uređajima, koji
            nam omogućuje svakodnevno dopremanje svježeg mesa i mesnih proizvoda diljem Hrvatske.
          </p>
        </div>
      </section>

      <section className="section cream">
        <div className="container split">
          <img src={img('marko.jpg')} alt="Pogon Rigeta" loading="lazy" />
          <p>
            Temeljna odrednica našeg poslovanja je proizvodnja kvalitetnog i zdravstveno ispravnog proizvoda te
            udovoljavanje zahtjevima naših kupaca. Implementirani HACCP sustav te certificirani IFS Food standard na
            višem nivou potvrđuju našu svakodnevnu težnju vrhunskoj kvaliteti.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split reverse">
          <img src={img('junad.jpg')} alt="Junad iz vlastitog tova" loading="lazy" />
          <div>
            <img src={img('baby_beef.png')} alt="Baby Beef" loading="lazy" style={{ width: 150, marginBottom: 20 }} />
            <p>
              Osim same proizvodnje mesa, društvo, kao jedan od osnivača najveće i najstarije udruge tovljača junadi u
              Republici Hrvatskoj, „Baby Beef“, ima i razvijenu domaću kooperativnu mrežu unutar koje svake godine
              uzgojimo preko 1.000 komada junadi, hranjene samo najkvalitetnijom stočnom hranom s naših polja.
            </p>
          </div>
        </div>
      </section>

      <section className="section cream" id="eu-projekti">
        <div className="container">
          <PageTitle nadnaslov="Sufinancirano sredstvima EU">EU projekti</PageTitle>
          <div className="cards">
            {EU_PROJEKTI.map((p, i) => (
              <article key={i} className="card eu-card">
                {p.slika && (
                  <img
                    className={`eu-photo${p.slika.startsWith('ISO') ? ' contain' : ''}`}
                    src={img(p.slika)}
                    alt=""
                    loading="lazy"
                  />
                )}
                <div className="card-body">
                  <h3>{p.naziv ?? <Nedostaje sto="Naziv novog projekta" />}</h3>
                  <p>{p.opis ?? <Nedostaje sto="Kratki opis, ciljevi i očekivani rezultati projekta" />}</p>
                  <dl>
                    <dt>Fond</dt>
                    <dd>{p.fond ?? <Nedostaje sto="Naziv fonda / programa" />}</dd>
                    <dt>Ukupna vrijednost</dt>
                    <dd>{p.ukupnaVrijednost ?? <Nedostaje sto="Iznos" />}</dd>
                    <dt>EU potpora</dt>
                    <dd>{p.iznosPotpore ?? <Nedostaje sto="Iznos" />}</dd>
                    <dt>Razdoblje provedbe</dt>
                    <dd>{p.razdoblje ?? <Nedostaje sto="Od – do" />}</dd>
                  </dl>
                </div>
              </article>
            ))}
          </div>
          <div className="eu-note">
            <img src={img('HR-Sufinancira-Europska-unija_POS-1.jpg')} alt="Sufinancira Europska unija" loading="lazy" />
            <p>
              Sadržaj ove stranice isključiva je odgovornost društva RIGETA d.o.o. i ni pod kojim se uvjetima ne može
              smatrati kao odraz stajališta Europske unije.
            </p>
          </div>
        </div>
      </section>

      <section className="section center">
        <div className="container narrow">
          <span className="kicker">Prihvatite izazov!</span>
          <h2>Posao u Rigeti</h2>
          <Link href="/posao" className="btn">Prijavite se</Link>
        </div>
      </section>
    </>
  )
}
