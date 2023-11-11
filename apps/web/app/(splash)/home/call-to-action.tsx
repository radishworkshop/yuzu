import { GetStartedButtons } from '@/app/(splash)/home/lede'
import Globe from '@/components/magicui/globe'

export default async function CallToAction() {
  const t = function(str: string) { return str } //await getI18n()

  return (
    <div className="relative overflow-hidden border-t min-w-[320px]">
      <div
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-yuzu to-grapefruit"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="max-w-3xl pt-16 pb-24 px-4 mx-auto text-center">
        <Globe className="h-96 w-96 mb-4 static" />
        <h2 className="text-4xl font-extrabold sm:text-5xl mb-6">
          {t('Grow with Yuzu today')}
        </h2>
        <GetStartedButtons />
      </div>
    </div>
  )
}
