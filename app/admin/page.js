import Link from 'next/link'
import { isAdmin } from '@/lib/admin'
import { CV_BUCKET, getSupabase, supabaseGreska } from '@/lib/supabase'
import { POSLOVNICE, eur } from '@/lib/site'
import { odjava, prijava, spremiCijenu } from './actions'

export const metadata = { title: 'Administracija' }
export const dynamic = 'force-dynamic'

const datumVrijeme = (iso) =>
  new Date(iso).toLocaleString('hr-HR', { timeZone: 'Europe/Zagreb', dateStyle: 'short', timeStyle: 'short' })

export default async function Admin({ searchParams }) {
  const { greska, poslovnica = POSLOVNICE[0].slug } = await searchParams

  if (!(await isAdmin())) {
    return (
      <section className="section page-plain admin">
        <div className="container narrow">
          <h1>Administracija</h1>
          {!process.env.ADMIN_PASSWORD && <p className="notice">Varijabla ADMIN_PASSWORD nije postavljena.</p>}
          {greska && <p className="form-status err">Pogrešna lozinka.</p>}
          <form action={prijava} className="inline-form" style={{ marginTop: 20 }}>
            <input type="password" name="lozinka" placeholder="Lozinka" required autoComplete="current-password" />
            <button className="btn btn-small">Prijava</button>
          </form>
        </div>
      </section>
    )
  }

  const supabase = getSupabase()
  if (!supabase) {
    return (
      <section className="section page-plain admin">
        <div className="container narrow">
          <h1>Administracija</h1>
          <p className="notice">Supabase nije spojen. {supabaseGreska()}</p>
        </div>
      </section>
    )
  }

  const [stavke, poruke, prijave] = await Promise.all([
    supabase.from('cjenik_stavke').select('*').eq('poslovnica', poslovnica).order('sifra'),
    supabase.from('poruke').select('*').order('created_at', { ascending: false }).limit(20),
    supabase.from('prijave').select('*').order('created_at', { ascending: false }).limit(20),
  ])
  const greskaBaze = stavke.error || poruke.error || prijave.error

  const cvLinkovi = {}
  for (const p of prijave.data ?? []) {
    const { data } = await supabase.storage.from(CV_BUCKET).createSignedUrl(p.cv_putanja, 600)
    cvLinkovi[p.id] = data?.signedUrl
  }

  return (
    <section className="section page-plain admin">
      <div className="container">
        <div className="price-head">
          <h1 style={{ margin: 0 }}>Administracija</h1>
          <form action={odjava}>
            <button className="btn btn-small btn-outline">Odjava</button>
          </form>
        </div>
        {greskaBaze && <p className="notice">Greška baze: {greskaBaze.message}. Je li pokrenut supabase/schema.sql?</p>}

        <h2>Cjenik</h2>
        <p>
          Cijenu mijenjate samo kada se stvarno promijeni. XML/CSV cjenici svaki dan automatski nose novi datum.
        </p>
        <div className="tabs">
          {POSLOVNICE.map((p) => (
            <Link key={p.slug} href={`/admin?poslovnica=${p.slug}`} className={p.slug === poslovnica ? 'active' : undefined}>
              {p.naziv}
            </Link>
          ))}
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Šifra</th>
                <th>Naziv</th>
                <th className="num">Trenutna MPC</th>
                <th>Nova MPC (€)</th>
                <th>Zadnja izmjena</th>
              </tr>
            </thead>
            <tbody>
              {(stavke.data ?? []).map((s) => (
                <tr key={s.id}>
                  <td>{s.sifra}</td>
                  <td className="wrap">{s.naziv}</td>
                  <td className="num">{eur(s.mpc)}</td>
                  <td>
                    <form action={spremiCijenu} className="inline-form">
                      <input type="hidden" name="id" value={s.id} />
                      <input type="number" name="mpc" step="0.01" min="0.01" defaultValue={Number(s.mpc).toFixed(2)} required />
                      <button className="btn btn-small">Spremi</button>
                    </form>
                  </td>
                  <td>{datumVrijeme(s.azurirano)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ marginTop: 60 }}>Poruke s kontakt forme</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Zaprimljeno</th>
                <th>Ime</th>
                <th>Kontakt</th>
                <th>Poruka</th>
              </tr>
            </thead>
            <tbody>
              {(poruke.data ?? []).map((p) => (
                <tr key={p.id}>
                  <td>{datumVrijeme(p.created_at)}</td>
                  <td>{p.ime}</td>
                  <td>
                    {p.email}
                    {p.telefon && <><br />{p.telefon}</>}
                  </td>
                  <td className="wrap">{p.poruka}</td>
                </tr>
              ))}
              {poruke.data?.length === 0 && (
                <tr>
                  <td colSpan={4}>Još nema poruka.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <h2 style={{ marginTop: 60 }}>Prijave za posao</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Zaprimljeno</th>
                <th>Ime</th>
                <th>Kontakt</th>
                <th>Radno mjesto</th>
                <th>Poruka</th>
                <th>Životopis</th>
              </tr>
            </thead>
            <tbody>
              {(prijave.data ?? []).map((p) => (
                <tr key={p.id}>
                  <td>{datumVrijeme(p.created_at)}</td>
                  <td>{p.ime}</td>
                  <td>
                    {p.email}
                    {p.telefon && <><br />{p.telefon}</>}
                  </td>
                  <td>{p.radno_mjesto ?? '–'}</td>
                  <td className="wrap">{p.poruka ?? '–'}</td>
                  <td>
                    {cvLinkovi[p.id] ? (
                      <a href={cvLinkovi[p.id]} target="_blank" rel="noopener">{p.cv_naziv ?? 'Preuzmi'}</a>
                    ) : (
                      '–'
                    )}
                  </td>
                </tr>
              ))}
              {prijave.data?.length === 0 && (
                <tr>
                  <td colSpan={6}>Još nema prijava.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
