import { cjenikCsv, cjenikXml, getCjenik } from '@/lib/cjenik'
import { POSLOVNICE, TVRTKA, danasZagreb } from '@/lib/site'

// Cjenik se generira pri svakom zahtjevu, pa uvijek nosi današnji datum i trenutne cijene.
export const dynamic = 'force-dynamic'

const FORMATI = {
  'cjenik.xml': { tip: 'application/xml; charset=utf-8', ekstenzija: 'xml', generiraj: cjenikXml },
  'cjenik.csv': { tip: 'text/csv; charset=utf-8', ekstenzija: 'csv', generiraj: cjenikCsv },
}

export async function GET(_request, { params }) {
  const { poslovnica: slug, datoteka } = await params
  const poslovnica = POSLOVNICE.find((p) => p.slug === slug)
  const format = FORMATI[datoteka]
  if (!poslovnica || !format) return new Response('Nije pronađeno', { status: 404 })

  const datum = danasZagreb()
  const { stavke } = await getCjenik(slug)
  const tijelo = format.generiraj({ tvrtka: TVRTKA, poslovnica, datum, stavke })

  return new Response(tijelo, {
    headers: {
      'Content-Type': format.tip,
      'Content-Disposition': `inline; filename="rigeta_${slug}_${datum}.${format.ekstenzija}"`,
      'Cache-Control': 'no-store',
    },
  })
}
