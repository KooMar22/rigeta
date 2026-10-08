import { PageTitle } from '@/components/Hero'
import { img } from '@/lib/site'

export const metadata = { title: 'Proizvodi' }

const CEVAPI = ['banjalucki_cevapi.png', 'junetina_i_ovcetina.png', 'junetina_i_svinjetina.png', 'cevapcici.png']

export default function Proizvodi() {
  return (
    <>
      <section className="section page-plain">
        <div className="container">
          <PageTitle>Proizvodi</PageTitle>
        </div>
        <div className="container split" id="svjeze-meso">
          <img src={img('svjeze_meso.jpg')} alt="Svježe meso" loading="lazy" />
          <div>
            <h2>Svježe meso</h2>
            <p>
              Već od samog izbora sirovine preko ulazne kontrole na prijemu pa sve do krajnjeg proizvoda naš stručni tim
              bira najkvalitetnije komade mesa za Vaš obiteljski stol. U suvremenom pogonu, svakoga dana naši djelatnici
              rasijecaju prosječno 10 tona junećeg, telećeg, svinjskog i janjećeg mesa. Vješte ruke naših mesara
              različitim vrstama rezova, a sukladno željama kupaca, osiguravaju proizvod vrhunske kvalitete.
            </p>
          </div>
        </div>
      </section>

      <section className="section cream" id="mljeveno-meso">
        <div className="container split reverse">
          <img src={img('mljeveno_meso.jpg')} alt="Mljeveno meso" loading="lazy" />
          <div>
            <h2>Mljeveno meso</h2>
            <p>
              Temelj svakog kvalitetnog proizvoda je kvaliteta sirovine koja se koristi. Kvalitetu naših mljevenih mesa
              osiguravamo pomnim biranjem najkvalitetnijih komada mesa od životinja iz vlastitog tova te jamčimo
              proizvod bez aditiva, umjetnih boja i aroma. U našoj lepezi proizvoda možete pronaći najbolje juneće
              mljeveno meso, sočno miješano mljeveno meso te svinjsko mljeveno meso.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="mesni-pripravci">
        <div className="container split">
          <img src={img('mesni_pripravci.jpg')} alt="Mesni pripravci" loading="lazy" />
          <div>
            <h2>Mesni pripravci</h2>
            <p>
              Idealni sastojci za roštilj su obitelj, prijatelji i najbolji specijaliteti jugoistočne Europe. Detaljno
              razrađene recepture tradicijskih proizvoda jamče užitak sa svakim zalogajem, a suvremena tehnologija
              pakiranja omogućava dugotrajnu svježinu. Potražite u našim mesnicama i hladnjacima velikih trgovačkih
              lanaca jedne od naših ćevapčića: „Banjalučki“, „Junetina ovčetina“, „Junetina svinjetina“ te razveselite
              svoje okusne pupoljke.
            </p>
          </div>
        </div>
        <div className="container cevapi">
          {CEVAPI.map((c) => (
            <img key={c} src={img(c)} alt="" loading="lazy" />
          ))}
        </div>
      </section>
    </>
  )
}
