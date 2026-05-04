import { HeroSection } from '@/app/components/landing/HeroSection'
import { ProofSection } from '@/app/components/landing/ProofSection'
import { OphiuchusSection } from '@/app/components/landing/OphiuchusSection'
import { CTASection } from '@/app/components/landing/CTASection'
import { Footer } from '@/app/components/landing/Footer'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProofSection />
      <OphiuchusSection />
      <CTASection />
      <Footer />
    </main>
  )
}
