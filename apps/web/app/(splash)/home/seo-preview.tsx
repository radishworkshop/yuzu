import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SEOPreview() {
  return (
    <div className="relative border-t py-28">
      <div
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden opacity-25 blur-3xl pt-40 xl:justify-end"
        aria-hidden="true"
      >
        <div
          className="aspect-[1313/771] w-[40.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-yuzu to-grapefruit xl:mr-[calc(20%-12rem)]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-xl md:max-w-3xl lg:max-w-7xl px-6 lg:px-8">
        <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-br from-yuzu to-grapefruit brighten-110">Grow</h2>
        <p className="mt-2 font-bold tracking-tight text-4xl">Get 30% more visits</p>
        <div className="mt-8 grid grid-cols-1 gap-16 text-muted-foreground leading-7 mb-8 lg:max-w-none lg:grid-cols-2">
          <div>
            <p>
              It&apos;s well-documented that language affects Search Engine Optimization (SEO). Google itself says,{' '}
              <Link className="underline" href="https://www.google.com/search/howsearchworks/how-search-works/ranking-results/">
                &quot;If you search in French, most results displayed will be in that language, as it&apos;s likely you want.&quot;
              </Link>{' '}
              Meanwhile, most of the world doesn&apos;t speak English, and consumers are more likely to browse and buy
              in their own language.{' '}
              <Link className="underline" href="https://hbr.org/2012/08/speak-to-global-customers-in-t">
                Customers are even willing to pay more if you give them info in their own languages,
              </Link>{' '}
              according to <span className="italic">Harvard Business Review</span>.
            </p>
          </div>
          <div>
            <p>
              Yuzu is the shortest path between where you are today and opening your digital doors to a global audience.
              While our primary focus is developer experience—the number one cost- and pain-saving opportunity in localization—we
              are also set up to assist on larger efforts by later stage companies. To learn if Yuzu might be the right option for 
              you, simply click below to schedule a call. Your developers will thank you!
            </p>
          </div>
        </div>
        <Link target="_blank" href="https://savvycal.com/zrw/yuzu-demo"><Button size="lg">Schedule a demo</Button></Link>
      </div>
    </div>
  )
}
