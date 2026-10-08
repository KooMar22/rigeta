'use client'

import { saveConsent, useConsent } from '@/lib/consent'

export default function MapEmbed({ upit }) {
  const privola = useConsent()

  if (privola?.vanjski) {
    return (
      <iframe
        className="map"
        title="Google karta"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${encodeURIComponent(upit)}&output=embed`}
      />
    )
  }

  return (
    <div className="map map-placeholder">
      <p>Karta se učitava s Google Maps servisa, koji može postaviti vlastite kolačiće.</p>
      <button className="btn" onClick={() => saveConsent(true)}>Dopusti i prikaži kartu</button>
    </div>
  )
}
