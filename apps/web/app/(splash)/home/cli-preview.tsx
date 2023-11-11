import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LandingCard } from '@/components/ui/card'

export default async function CLIPreview() {
  const t = function(str: string) { return str } //await getI18n()

  const steps = [{
    title: 'npx yuzu build',
    description: t('Compile all the strings in your project into yuzu directory')
  }, {
    title: 'npx yuzu push',
    description: t('Push your default language messages to your Yuzu project')
  }, {
    title: 'npx yuzu translate',
    description: t('Automatically fill in missing translations in your Yuzu project')
  }, {
    title: 'npx yuzu pull',
    description: t('Pull down and compile the latest dictionary from Yuzu')
  }]
  return (
    <div className="relative border-t pb-32 pt-24 sm:pt-32">
      <div
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
        aria-hidden="true"
      >
        <div
          className="mr-[22rem] mt-12 aspect-[1313/771] w-[32rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-yuzu to-grapefruit xl:ml-0 xl:mr-[calc(50%-60rem)]"
          style={{
            clipPath:
              'polygon(97.5% 26.9%, 27.5% 34.5%, 85.5% 0.1%, 0.1% 64.9%, 27.6% 76.8%, 76.1% 97.7%, 52.4% 68.1%, 45.2% 34.5%, 80.7% 2%, 47.5% 58.3%, 17.9% 100%, 74.1% 44.1%, 72.5% 32.5%, 27.5% 76.7%, 100% 61.6%, 60.2% 62.4%)'
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-br from-yuzu to-grapefruit brighten-110">Integrate</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{t('Powerful command-line tools')}</p>
        {/* This will use the <T></T> component} */}
        <p className="mt-2 text-base">Yuzu&apos;s{' '}
          <Link className="underline" href="https://npmjs.com/package/yuzu">open source CLI</Link> is fully featured.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-8">
          {steps.map((step, i) => (
            <LandingCard className="p-6 text-sm" key={i}>
              <div className="flex items-center">
                <div className="mr-2 flex items-center justify-center h-6 w-6 flex-none rounded-full bg-muted-foreground/20">{i + 1}</div>
                <div className="font-bold text-sm"><code>{step.title}</code></div>
              </div>
              <div className="text-sm mt-4 leading-6">{step.description}</div>
            </LandingCard>
          ))}
        </div>
        <Link href="/docs"><Button size="lg">{t('Read the Docs')}</Button></Link>
      </div>
    </div>
  )
}
