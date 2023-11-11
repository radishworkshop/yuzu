import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ClerkLoaded, SignUpButton } from '@clerk/nextjs'
import { LandingCard } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function FeaturesPreview() {
  const showcase = [{
    icon: '⭐️',
    title: 'Open source',
    description: (<>
      The entire source code Yuzu is freely available.
      If you think open source is as cool as we do,{' '}
      <Link href="/" className="underline">consider giving us a star</Link>. 
    </>)
  }, {
    icon: '📣',
    title: 'Tone matching',
    description: `The Codesheets assistant is powered by GPT-4, which can automatically match the tone that you want for translations.`
  }, {
    icon: '🤖',
    title: 'Smart AI selection',
    description: `Different models perform better for different situations and language pairs. Yuzu will choose the highest performing one for each translation you need.`
  }, {
    icon: '📐',
    title: 'Length controls',
    description: `Some languages like German are naturally longer than others, which can frustrate UIs. The Codesheets assistant can help you ensure strings are of similar length across languages.`
  }, {
    icon: '🧮',
    title: 'Pluralization',
    description: `Using next-international's pluralization rules, Yuzu accounts for strings that depend on a variable.`
  }, {
    icon: '🤓',
    title: 'Expert review',
    description: `Iterative machine translation will often get you 100% of the way there. If not, reach out directly to get connected with our team of linguists.`
  }]
  return (
    <div className="relative border-t pb-32 pt-24 sm:pt-32">
      <div
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
        aria-hidden="true"
      >
        <div
          className="ml-[82rem] aspect-[1313/771] w-[42rem] flex-none origin-top-right rotate-[20deg] bg-gradient-to-tr from-yuzu to-grapefruit xl:ml-0 xl:mr-[calc(50%-12rem)]"
          style={{
            clipPath:
              'polygon(27.5% 34.5%, 52.4% 68.1%, 74.1% 44.1%, 85.5% 0.1%, 60.2% 62.4%, 45.2% 34.5%, 76.1% 97.7%, 100% 61.6%, 17.9% 100%, 0.1% 64.9%, 47.5% 58.3%, 80.7% 2%, 97.5% 26.9%, 72.5% 32.5%, 27.6% 76.8%, 27.5% 76.7%)'
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-br from-yuzu to-grapefruit brighten-110">Features</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Inventing state of the art quality</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-8">
          {showcase.map((feature, i) => (
            <LandingCard key={i}>
              <div className="px-6 pt-6 flex items-center">
                <div className="mr-2 flex items-center justify-center h-6 w-6 flex-none text-xl">
                  {feature.icon}
                </div>
                <div className="font-bold text-lg">{feature.title}</div>
              </div>
              <Separator className="mt-5" />
              <div className="px-6 pb-6 text-base mt-4 leading-6">{feature.description}</div>
            </LandingCard>
          ))}
        </div>
        <div className="h-12">
          <ClerkLoaded>
            <div className="animate-fade-in">
              <SignUpButton>
                <Button variant="yuzu" size="lg" className="w-48">
                  Get started <span aria-hidden="true" className="text-lg ml-1 animate-wiggle">&rarr;</span>
                </Button>
              </SignUpButton>
            </div>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  )
}
