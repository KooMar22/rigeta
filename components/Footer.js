import Link from 'next/link'
import { POSLOVNICE, TVRTKA, img, telHref } from '@/lib/site'
import { CookieSettingsButton } from './CookieBanner'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4>{TVRTKA.naziv}</h4>
          <p>
            {TVRTKA.adresa}
            <br />
            {TVRTKA.grad}
            <br />
            <a href={`mailto:${TVRTKA.email}`}>{TVRTKA.email}</a>
            <br />
            Tel: <a href={telHref(TVRTKA.telefoni[0])}>{TVRTKA.telefoni[0]}</a>
          </p>
        </div>
        <div>
          <h4>Poslovnice</h4>
          <ul>
            {POSLOVNICE.map((p) => (
              <li key={p.slug}>{p.adresa}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Informacije</h4>
          <ul>
            <li><Link href="/cjenici">Maloprodajni cjenici</Link></li>
            <li><Link href="/o-nama#eu-projekti">EU projekti</Link></li>
            <li><Link href="/politika-sigurnosti-hrane">Politika sigurnosti hrane</Link></li>
            <li><Link href="/pravila-privatnosti">Pravila privatnosti</Link></li>
            <li><Link href="/kolacici">Politika kolačića</Link></li>
            <li><CookieSettingsButton /></li>
          </ul>
        </div>
        <div className="footer-eu">
          <img src={img('HR-Sufinancira-Europska-unija_POS-1.jpg')} alt="Sufinancira Europska unija" loading="lazy" />
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          © {new Date().getFullYear()} {TVRTKA.naziv} · Demo verzija – nije službena stranica društva
        </div>
      </div>
    </footer>
  )
}
