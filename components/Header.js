'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAV, img } from '@/lib/site'

export default function Header() {
  const pathname = usePathname()
  const [otvoren, setOtvoren] = useState(false)

  useEffect(() => setOtvoren(false), [pathname])
  useEffect(() => {
    document.body.classList.toggle('no-scroll', otvoren)
  }, [otvoren])

  return (
    <header className="site-header">
      <Link href="/" className="site-logo" aria-label="Rigeta – naslovnica">
        <img src={img('logotip.png')} alt="Rigeta d.o.o." width="454" height="240" />
      </Link>
      <button
        className={`burger${otvoren ? ' toggle' : ''}`}
        aria-label={otvoren ? 'Zatvori izbornik' : 'Otvori izbornik'}
        aria-expanded={otvoren}
        onClick={() => setOtvoren(!otvoren)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`site-nav${otvoren ? ' open' : ''}`}>
        <ul>
          {NAV.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className={pathname.startsWith(s.href) ? 'active' : undefined}>
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
