import Image from 'next/image'
import bg from '@/public/images/product/bg.jpg'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ClerkLoaded, SignUpButton } from '@clerk/nextjs'
import { Icons } from '@/components/misc/icons'

export function GetStartedButtons() {
  return (
    <div className="h-20 mt-4 mx-auto">
      <ClerkLoaded>
        <div className="flex flex-col xs:flex-row-reverse justify-center items-center gap-4 animate-fade-in">
          <SignUpButton>
            <Button variant="yuzu" size="lg" className="w-48">
              Get started <span aria-hidden="true" className="text-lg ml-1 animate-wiggle">&rarr;</span>
            </Button>
          </SignUpButton>
          <Link target="_blank" href="https://savvycal.com/zrw/yuzu-demo">
            <Button variant="outline" size="lg" className="w-48">
              Schedule a demo
            </Button>
          </Link>
        </div>
      </ClerkLoaded>
    </div>
  )
}

export default function Lede() {
  return (
    <div className="relative min-w-[320px] pt-16">
      <Image src={bg} alt="Background photo" className="absolute -z-10 inset-0 h-full w-full object-cover opacity-10" />
      <div className="max-w-5xl px-4 pt-24 sm:pt-32 pb-28 px-4 mx-auto text-center animate-fade-up">
        <div className="mx-auto w-52 cursor-pointer flex gap-1 justify-center rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-primary/10 hover:ring-primary/20">
          <Link target="_blank" href="https://github.com/radishworkshop/yuzu"
                className="font-bold flex items-center">
            <Icons.github className="w-4 h-4 mr-3" />
            Proudly open source
          </Link>
        </div>
        <h1 className="mt-6 text-center text-4xl xs:text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl">
          Localize{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-grapefruit to-yuzu brighten-110">NextJS</span>
          <br />
          apps in a snap
        </h1>
        <p className="mt-4 max-w-lg sm:max-w-xl mx-auto text-base sm:text-lg sm:leading-8 text-muted-foreground">
          Live up to your global mission, find users where your competitors aren&apos;t, and get 30% more visitors with improved SEO.
        </p>
        <GetStartedButtons />
      </div>
    </div>


  )

}