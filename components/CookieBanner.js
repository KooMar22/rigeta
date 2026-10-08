'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { OTVORI_POSTAVKE, saveConsent, useConsent } from '@/lib/consent'

export function CookieSettingsButton() {
  return (
    <button className="link-button" onClick={() => window.dispatchEvent(new Event(OTVORI_POSTAVKE))}>
      Postavke kolačića
    </button>
  )
}

export default function CookieBanner() {
  const privola = useConsent()
  const [rucnoOtvoren, setRucnoOtvoren] = useState(false)
  const [postavke, setPostavke] = useState(false)
  const [vanjski, setVanjski] = useState(false)

  useEffect(() => {
    const otvori = () => {
      setRucnoOtvoren(true)
      setPostavke(true)
    }
    window.addEventListener(OTVORI_POSTAVKE, otvori)
    return () => window.removeEventListener(OTVORI_POSTAVKE, otvori)
  }, [])

  useEffect(() => {
    if (privola) setVanjski(privola.vanjski)
  }, [privola])

  if (privola === undefined) return null
  if (privola && !rucnoOtvoren) return null

  const spremi = (vrijednost) => {
    saveConsent(vrijednost)
    setRucnoOtvoren(false)
    setPostavke(false)
  }

  return (
    <div className="cookie-banner" role="dialog" aria-label="Postavke kolačića">
      <div className="cookie-inner">
        <div className="cookie-text">
          <strong>Kolačići i vanjski sadržaj</strong>
          <p>
            Koristimo samo nužnu pohranu potrebnu za rad stranice. Uz Vaš pristanak učitavamo i vanjski sadržaj
            (Google karte), koji može postaviti vlastite kolačiće. Više u <Link href="/kolacici">politici kolačića</Link>.
          </p>
          {postavke && (
            <div className="cookie-options">
              <label>
                <input type="checkbox" checked disabled /> Nužni – uvijek aktivni
              </label>
              <label>
                <input type="checkbox" checked={vanjski} onChange={(e) => setVanjski(e.target.checked)} /> Vanjski
                sadržaj (Google karte)
              </label>
            </div>
          )}
        </div>
        <div className="cookie-actions">
          {postavke ? (
            <button className="btn" onClick={() => spremi(vanjski)}>Spremi odabir</button>
          ) : (
            <button className="btn btn-ghost" onClick={() => setPostavke(true)}>Postavke</button>
          )}
          <button className="btn btn-outline" onClick={() => spremi(false)}>Samo nužni</button>
          <button className="btn" onClick={() => spremi(true)}>Prihvati sve</button>
        </div>
      </div>
    </div>
  )
}
