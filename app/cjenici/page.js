import { PageTitle } from '@/components/Hero'
import { getCjenik } from '@/lib/cjenik'
import { POSLOVNICE, danasZagreb, eur, formatDatum } from '@/lib/site'

export const metadata = { title: 'Maloprodajni cjenici' }
// datum i cijene se čitaju pri svakom otvaranju stranice
export const dynamic = 'force-dynamic'

export default async function Cjenici() {
  const datum = danasZagreb()
  const cjenici = await Promise.all(POSLOVNICE.map(async (p) => ({ poslovnica: p, ...(await getCjenik(p.slug)) })))
  const demo = cjenici.some((c) => c.izvor === 'demo')

  return (
    <section className="section page-plain">
      <div className="container">
        <PageTitle nadnaslov="Maloprodaja">Cjenici</PageTitle>
        <p>
          Maloprodajni cjenici naših poslovnica objavljuju se svakodnevno, u strojno čitljivom obliku (XML i CSV).
          Datum cjenika ažurira se automatski, a cijene se mijenjaju samo kada ih promijenimo u poslovnici.
        </p>
        {demo && (
          <p className="notice">
            Demo prikaz: baza nije spojena pa su prikazani primjeri artikala s izmišljenim cijenama.
          </p>
        )}

        {cjenici.map(({ poslovnica, stavke }) => (
          <div className="price-section" key={poslovnica.slug} id={poslovnica.slug}>
            <div className="price-head">
              <div>
                <h2>{poslovnica.naziv}</h2>
                <p>
                  {poslovnica.adresa} · cjenik za dan <strong>{formatDatum(datum)}</strong>
                </p>
              </div>
              <div className="price-actions">
                <a className="btn btn-small" href={`/cjenici/${poslovnica.slug}/cjenik.xml`}>XML</a>
                <a className="btn btn-small btn-outline" href={`/cjenici/${poslovnica.slug}/cjenik.csv`}>CSV</a>
              </div>
            </div>
            <div className="table-wrap">
              <table className="responsive">
                <thead>
                  <tr>
                    <th>Šifra</th>
                    <th>Naziv</th>
                    <th>Kategorija</th>
                    <th className="num">Neto količina</th>
                    <th className="num">MPC</th>
                    <th className="num">Cijena po jed. mjere</th>
                    <th className="num">Najniža u 30 dana</th>
                    <th className="num">Sidrena cijena</th>
                  </tr>
                </thead>
                <tbody>
                  {stavke.map((s) => (
                    <tr key={s.id}>
                      <td data-label="Šifra">{s.sifra}</td>
                      <td className="wrap title">{s.naziv}</td>
                      <td data-label="Kategorija">{s.kategorija}</td>
                      <td className="num" data-label="Neto količina">
                        {String(s.neto_kolicina).replace('.', ',')} {s.jedinica_mjere}
                      </td>
                      <td className="num" data-label="MPC">
                        <strong>{eur(s.mpc)}</strong>
                      </td>
                      <td className="num" data-label="Cijena po jed. mjere">
                        {eur(s.cijena_po_jm)}/{s.jedinica_mjere}
                      </td>
                      <td className="num" data-label="Najniža u 30 dana">{eur(s.najniza_30d)}</td>
                      <td className="num" data-label="Sidrena cijena">{eur(s.sidrena_cijena)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
