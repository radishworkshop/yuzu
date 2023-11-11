import Link from 'next/link'
import Image from 'next/image'
import codesheetsLight from '@/public/images/product/light/codesheets.png'
import codesheetsDark from '@/public/images/product/dark/codesheets.png'

export default function EditorPreview() {
  return (
    <div className="relative border-t pb-24 pt-24 sm:pt-32">
      <div
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
        aria-hidden="true"
      >
        <div
          className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-yuzu to-grapefruit xl:ml-0 xl:mr-[calc(50%-12rem)]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-br from-yuzu to-grapefruit brighten-110">Edit</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">A spreadsheet with superpowers</p>
        <div className="mt-6">
          <Image className='hidden dark:block' alt="Editor preview" src={codesheetsDark} width={2000} height={1400} />
          <Image className='block dark:hidden' alt="Editor preview" src={codesheetsLight} width={2000} height={1400} />
        </div>
        <p className="mt-4 max-w-lg sm:max-w-xl mx-auto text-lg leading-8 text-muted-foreground">
          Every Yuzu project is powered by <Link className="underline" href="https://codesheets.com">Codesheets</Link>, a powerful collaborative spreadsheet editor and API, with GPT-4 built in.
        </p>
      </div>
    </div>
  )
}
