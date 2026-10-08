import Hero, { PageTitle } from '@/components/Hero'
import JobForm from '@/components/JobForm'

export const metadata = { title: 'Posao' }

export default function Posao() {
  return (
    <>
      <Hero slika="posao_hero.jpg" />
      <section className="section cream">
        <div className="container narrow">
          <PageTitle nadnaslov="Prihvatite izazov!">Posao</PageTitle>
          <p>Učitajte Vaš životopis koristeći našu formu. Podržani formati su pdf i docx, do 4 MB.</p>
          <JobForm />
        </div>
      </section>
    </>
  )
}
