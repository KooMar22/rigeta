import { Expletus_Sans, Open_Sans } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import { img } from '@/lib/site'
import './globals.css'

const naslovi = Expletus_Sans({ subsets: ['latin', 'latin-ext'], weight: ['400', '600', '700'], variable: '--font-head' })
const tekst = Open_Sans({ subsets: ['latin', 'latin-ext'], weight: ['300', '400', '600'], variable: '--font-body' })

export const metadata = {
  title: { default: 'Rigeta d.o.o. – Vrhunska kvaliteta', template: '%s – Rigeta d.o.o.' },
  description:
    'RIGETA d.o.o. je trgovačko društvo za proizvodnju, preradu i prodaju mesa i mesnih proizvoda koje je započelo s radom 1991. g.',
  icons: { icon: img('cropped-favicon-32x32.png') },
  // demo verzija ne smije se indeksirati uz postojeću stranicu
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }) {
  return (
    <html lang="hr" className={`${naslovi.variable} ${tekst.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
