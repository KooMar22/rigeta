'use client'

import { useEffect, useState } from 'react'

const KEY = 'rigeta-kolacici'
const PROMJENA = 'rigeta-kolacici-promjena'
export const OTVORI_POSTAVKE = 'rigeta-kolacici-otvori'

export function readConsent() {
  try {
    return JSON.parse(localStorage.getItem(KEY))
  } catch {
    return null
  }
}

export function saveConsent(vanjski) {
  const privola = { nuzni: true, vanjski, datum: new Date().toISOString() }
  try {
    localStorage.setItem(KEY, JSON.stringify(privola))
  } catch {}
  window.dispatchEvent(new Event(PROMJENA))
}

// undefined = još nije pročitano (SSR / prvi render), null = korisnik još nije odlučio
export function useConsent() {
  const [privola, setPrivola] = useState(undefined)
  useEffect(() => {
    const procitaj = () => setPrivola(readConsent())
    procitaj()
    window.addEventListener(PROMJENA, procitaj)
    return () => window.removeEventListener(PROMJENA, procitaj)
  }, [])
  return privola
}
