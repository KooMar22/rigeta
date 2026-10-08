'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FormStatus } from './ContactForm'

const MAX_VELICINA = 4 * 1024 * 1024

export default function JobForm() {
  const [stanje, setStanje] = useState({ status: 'mirovanje' })

  async function posalji(e) {
    e.preventDefault()
    const forma = e.currentTarget
    const podaci = new FormData(forma)
    const cv = podaci.get('cv')
    if (!/\.(pdf|docx)$/i.test(cv.name)) return setStanje({ status: 'greska', poruka: 'Životopis mora biti u pdf ili docx formatu.' })
    if (cv.size > MAX_VELICINA) return setStanje({ status: 'greska', poruka: 'Životopis je veći od 4 MB.' })

    setStanje({ status: 'slanje' })
    try {
      const res = await fetch('/api/prijava', { method: 'POST', body: podaci })
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
          Radno mjesto koje Vas zanima
          <input name="radno_mjesto" maxLength={120} />
        </label>
      </div>
      <label>
        Poruka
        <textarea name="poruka" rows={4} maxLength={4000} />
      </label>
      <label>
        Životopis (pdf ili docx, do 4 MB) *
        <input
          name="cv"
          type="file"
          required
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
      </label>
      <input name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className="checkbox">
        <input type="checkbox" name="privola" value="da" required />
        <span>
          Suglasan/na sam s obradom podataka u svrhu selekcijskog postupka, kako je opisano u{' '}
          <Link href="/pravila-privatnosti">pravilima privatnosti</Link>. *
        </span>
      </label>
      <button className="btn" disabled={stanje.status === 'slanje'}>
        {stanje.status === 'slanje' ? 'Šaljem…' : 'Pošalji prijavu'}
      </button>
      <FormStatus stanje={stanje} uspjeh="Hvala! Vaša prijava je zaprimljena." />
    </form>
  )
}
