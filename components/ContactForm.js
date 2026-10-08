'use client'

import Link from 'next/link'
import { useState } from 'react'
import { PREDMETI_UPITA } from '@/lib/site'

export default function ContactForm() {
  const [stanje, setStanje] = useState({ status: 'mirovanje' })

  async function posalji(e) {
    e.preventDefault()
    const forma = e.currentTarget
    setStanje({ status: 'slanje' })
    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(forma))),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.greska || 'Slanje nije uspjelo.')
      forma.reset()
      setStanje({ status: 'poslano', demo: data.demo })
    } catch (err) {
      setStanje({ status: 'greska', poruka: err.message })
    }
  }

  return (
    <form className="form" onSubmit={posalji}>
      <div className="form-row">
        <label>
          Ime i prezime *
          <input name="ime" required maxLength={120} autoComplete="name" />
        </label>
        <label>
          E-mail *
          <input name="email" type="email" required maxLength={160} autoComplete="email" />
        </label>
      </div>
      <div className="form-row">
        <label>
          Telefon
          <input name="telefon" type="tel" maxLength={40} autoComplete="tel" />
        </label>
        <label>
          Predmet upita *
          <select name="predmet" required defaultValue="">
            <option value="" disabled>
              Odaberite predmet
            </option>
            {PREDMETI_UPITA.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Poruka *
        <textarea name="poruka" rows={6} required maxLength={4000} />
      </label>
      {/* honeypot - ljudi ga ne vide, botovi ga popune */}
      <input name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className="checkbox">
        <input type="checkbox" name="privola" value="da" required />
        <span>
          Slažem se s obradom osobnih podataka u svrhu odgovora na moj upit, kako je opisano u{' '}
          <Link href="/pravila-privatnosti">pravilima privatnosti</Link>. *
        </span>
      </label>
      <button className="btn" disabled={stanje.status === 'slanje'}>
        {stanje.status === 'slanje' ? 'Šaljem…' : 'Pošalji poruku'}
      </button>
      <FormStatus stanje={stanje} uspjeh="Hvala! Vaša poruka je zaprimljena." />
    </form>
  )
}

export function FormStatus({ stanje, uspjeh }) {
  if (stanje.status === 'poslano')
    return (
      <p className="form-status ok" role="status">
        {uspjeh}
        {stanje.demo && ' (Demo način: baza nije spojena pa podaci nisu spremljeni.)'}
      </p>
    )
  if (stanje.status === 'greska')
    return (
      <p className="form-status err" role="alert">
        {stanje.poruka}
      </p>
    )
  return null
}
