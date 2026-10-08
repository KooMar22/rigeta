import Link from 'next/link'
import Hero from '@/components/Hero'
import { img } from '@/lib/site'

const PROIZVODI = [
  { naziv: 'Svježe meso', ikona: 'svjeze.svg', slika: 'svjeze_meso_hero.jpg', sidro: 'svjeze-meso' },
  { naziv: 'Mljeveno meso', ikona: 'mljeveno.svg', slika: 'mljeveno_meso_hero.jpg', sidro: 'mljeveno-meso' },
  { naziv: 'Mesni pripravci', ikona: 'pripravci.svg', slika: 'mesni_pripravci_hero.jpg', sidro: 'mesni-pripravci' },
]

export default function Naslovnica() {
  return (
    <>
      <Hero slika="naslovna_hero.jpg" visok />

      <section className="section center">
        <div className="container narrow">
          <p className="lead">
            RIGETA d.o.o. je trgovačko društvo u privatnom vlasništvu za proizvodnju, preradu i prodaju mesa i mesnih
            proizvoda koje je započelo s radom 1991. g.
          </p>
          <Link href="/o-nama" className="btn">Upoznajte nas</Link>
        </div>
      </section>

      <section className="section cream">
        <div className="container split">
          <img src={img('naslovna_meso.jpg')} alt="Svježe meso" loading="lazy" />
          <div>
            <p>Naša misija je isporučiti kupcu zdravstveno ispravno meso vrhunske teksture i kvalitete.</p>
            <p>
              Sustavnom kontrolom kvalitete osiguravamo proizvodnju zdravstveno ispravnog i kvalitetnog proizvoda
              prilagođenog željama naših kupaca.
            </p>
            <p>
              Postupajući u skladu sa zakonima te svim primjenjivim normama, a uz korištenje najnovijih tehnologija,
              ostvarujemo kvalitetne uvjete rada koji dovode do ostvarenja punog potencijala svih zaposlenika, a i
              društva kao cjeline.
            </p>
            <Link href="/kvaliteta" className="btn btn-outline">Kvaliteta</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center">
            <h2>Proizvodi</h2>
            <p>Temelj svakog kvalitetnog proizvoda jest kvaliteta sirovine koja se koristi.</p>
          </div>
          <div className="cards products" style={{ marginTop: 36 }}>
            {PROIZVODI.map((p) => (
              <Link key={p.sidro} href={`/proizvodi#${p.sidro}`} className="product-card">
                <img className="photo" src={img(p.slika)} alt="" loading="lazy" />
                <span className="overlay">
                  <img src={img(p.ikona)} alt="" />
                  {p.naziv}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
