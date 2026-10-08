import { img } from '@/lib/site'

export default function Hero({ slika, visok = false }) {
  return (
    <div
      className={`hero${visok ? ' hero-tall' : ''}`}
      style={{ backgroundImage: `url(${img(slika)})` }}
      role="presentation"
    />
  )
}

export function PageTitle({ nadnaslov, children }) {
  return (
    <div className="page-title">
      {nadnaslov && <span className="kicker">{nadnaslov}</span>}
      <h1>{children}</h1>
    </div>
  )
}
