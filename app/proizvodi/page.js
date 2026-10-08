import { PageTitle } from '@/components/Hero'
import { img } from '@/lib/site'

export const metadata = { title: 'Proizvodi' }

// slika: null = nova fotografija još nije dostavljena (naručitelj kupuje licencu)
const PROIZVODI = [
  {
    id: 'svjeze-meso',
    naziv: 'Svježe meso',
    slika: 'svjeze_meso.jpg',
    tekst:
      'Već od samog izbora sirovine preko ulazne kontrole na prijemu pa sve do krajnjeg proizvoda naš stručni tim bira najkvalitetnije komade mesa za Vaš obiteljski stol. U suvremenom pogonu, svakoga dana naši djelatnici rasijecaju prosječno 10 tona junećeg, telećeg, svinjskog i janjećeg mesa. Vješte ruke naših mesara različitim vrstama rezova, a sukladno željama kupaca, osiguravaju proizvod vrhunske kvalitete.',
  },
  {
    id: 'svjeza-janjetina',
    naziv: 'Svježa janjetina',
    slika: null,
    tekst:
      'Kvalitetna janjetina zauzima posebno mjesto u našoj ponudi. Pažljivo biramo janjeće meso kako bismo vam ponudili proizvod vrhunskog okusa i svježine. Savršena je za tradicionalna jela i pečenja, a često je nezaobilazan gost na stolovima u posebnim prigodama.',
  },
  {
    id: 'mljeveno-meso',
    naziv: 'Mljeveno meso',
    slika: 'mljeveno_meso.jpg',
    tekst:
      'Temelj svakog kvalitetnog proizvoda je kvaliteta sirovine koja se koristi. Kvalitetu naših mljevenih mesa osiguravamo pomnim biranjem najkvalitetnijih komada mesa od životinja iz vlastitog tova te jamčimo proizvod bez aditiva, umjetnih boja i aroma. U našoj lepezi proizvoda možete pronaći najbolje juneće mljeveno meso, sočno miješano mljeveno meso te svinjsko mljeveno meso.',
  },
  {
    id: 'mesni-pripravci',
    naziv: 'Mesni pripravci',
    slika: 'mesni_pripravci.jpg',
    tekst:
      'Idealni sastojci za roštilj su obitelj, prijatelji i najbolji specijaliteti jugoistočne Europe. Detaljno razrađene recepture tradicijskih proizvoda jamče užitak sa svakim zalogajem, a suvremena tehnologija pakiranja omogućava dugotrajnu svježinu. Potražite u našim mesnicama i hladnjacima velikih trgovačkih lanaca jedne od naših ćevapčića: „Banjalučki“, „Junetina ovčetina“, „Junetina svinjetina“ te razveselite svoje okusne pupoljke.',
  },
]

const ETIKETE = ['banjalucki_cevapi.png', 'junetina_i_ovcetina.png', 'junetina_i_svinjetina.png', 'cevapcici.png']

export default function Proizvodi() {
  return (
    <>
      <section className="section page-plain" style={{ paddingBottom: 0 }}>
        <div className="container">
          <PageTitle>Proizvodi</PageTitle>
        </div>
      </section>

      {PROIZVODI.map((p, i) => (
        <section key={p.id} id={p.id} className={`section${i % 2 ? ' cream' : ''}`}>
          <div className={`container split${i % 2 ? ' reverse' : ''}`}>
            {p.slika ? (
              <img src={img(p.slika)} alt={p.naziv} loading="lazy" />
            ) : (
              <div className="photo-placeholder">
                <span className="todo">Fotografija – dostavlja naručitelj</span>
              </div>
            )}
            <div>
              <h2>{p.naziv}</h2>
              <p>{p.tekst}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <p className="notice">
            Demo: prikazane su postojeće etikete. Pet novih etiketa (uključujući pljeskavice i juneće ćevape)
            dostavlja naručitelj.
          </p>
          <div className="cevapi">
            {ETIKETE.map((e) => (
              <img key={e} src={img(e)} alt="" loading="lazy" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
