import CallToAction from './call-to-action'
import FAQ from './faq'
import EditorPreview from './editor-preview'
import CLIPreview from './cli-preview'
import SEOPreview from './seo-preview'
import Lede from './lede'
import CustomersMarquee from './customers-marquee'
import FeaturesPreview from './features-preview'
import { User } from '@/types/user'
import { SiteHeader } from '@/components/ui/site-header'
import { mainNav } from '@/config/site'
import Pricing from './pricing'

interface HomeProps {
  user: User | null
}

export default function HomePage({ user }: HomeProps) {
  return (
    <>
      <SiteHeader user={user} topLinks={mainNav} fixed fadeIn />
      <Lede />
      <CustomersMarquee />
      <SEOPreview />
      <EditorPreview />
      <FeaturesPreview />
      <CLIPreview />
      <Pricing className='border-t pb-32 pt-24 sm:pt-32' />
      <FAQ />
      <CallToAction /> 
    </>
  )
}