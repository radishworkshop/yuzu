'use client'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Icons } from '@/components/misc/icons'
import clsx from 'clsx'
import { buttonVariants } from '@/components/ui/button'
import { LandingCard } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const frequencies: { value: 'monthly' | 'annually', label: string, priceSuffix: string }[] = [
  { value: 'monthly', label: 'Monthly billing', priceSuffix: '/ month' },
  { value: 'annually', label: 'Annual billing', priceSuffix: '/ month' },
]

const plans = [
  {
    name: 'Free',
    id: 'plan-free',
    href: '#',
    price: { monthly: '$0', annually: '$0' },
    description: 'Try Yuzu and integrate it into your codebase for free.',
    features: [
      '300 words / month',
      'Unlimited projects',
      'Unlimited collaborators',
      'Unlimited languages',
      'Discord support',
    ],
    cta: 'Sign up',
    mostPopular: false,
  },
  {
    name: 'Developer',
    id: 'plan-developer',
    href: '#',
    price: { monthly: '$35', annually: '$25' },
    description: 'For growing projects with more content and pages.',
    features: [
      '10,000 words / month',
      'Unlimited projects',
      'Unlimited collaborators',
      'Unlimited languages',
      'Discord support',
    ],
    cta: 'Buy plan',
    mostPopular: true,
  },
  {
    name: 'Custom',
    id: 'plan-custom',
    href: 'mailto:contact@yuzujs.com',
    priceStr: 'Contact us',
    description: 'Dedicated support and features for your company.',
    features: [
      'Unlimited words',
      'Unlimited projects',
      'Unlimited collaborators',
      'Unlimited languages',
      'Expert review',
      'Email & phone support',
      'Feature acceleration',
    ],
    cta: 'Get in touch',
    mostPopular: false,
  },
]

export default function Pricing({ className }: { className?: string }) {
  const [frequency, setFrequency] = useState(frequencies[1])

  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
        aria-hidden="true"
      >
        <div
          className="mr-[22rem] aspect-[1313/771] w-[29rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-yuzu to-grapefruit xl:ml-0 xl:mr-[calc(50%-12rem)]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-br from-yuzu to-grapefruit brighten-110">Simple pricing</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Plans for every stage
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="bg-background grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-primary/20"
          >
            <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }): string =>
                  clsx(
                    checked ? 'bg-primary text-background' : 'text-primary/60',
                    'cursor-pointer rounded-full px-2.5 py-1'
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl lg:grid-cols-3 lg:max-w-4xl xl:mx-0 xl:max-w-none">
          {plans.map((plan) => (
            <LandingCard
              key={plan.id}
              className={clsx(
                plan.mostPopular ? 'ring-1 ring-yuzu' : 'ring-0',
                'p-8'
              )}
            >
              {plan.mostPopular && (
                <div className="flex relative items-center justify-center">
                  <Badge variant="outline" className="-top-11 mx-auto absolute bg-background border-yuzu">Most popular</Badge>
                </div>
              )}
              <h3
                id={plan.id}
                className="text-lg font-semibold leading-8"
              >
                {plan.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{plan.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                {plan.price ? (
                  <>
                    <span className="h-10 text-4xl font-bold tracking-tight text-primary">{plan.price[frequency.value]}</span>
                    <span className="text-sm font-semibold leading-6 text-muted-foreground">{frequency.priceSuffix}</span>
                  </>
                ) : (
                  <span className="h-10 text-3xl font-bold tracking-tight text-muted-foreground">{plan.priceStr}</span>
                )}
              </p>
              <a
                href={plan.href}
                aria-describedby={plan.id}
                className={clsx(
                  plan.mostPopular
                    ? buttonVariants({ variant: 'yuzu' }) + ' shadow-sm w-full'
                    : 'w-full text-primary ring-2 ring-inset ring-primary',
                  'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yuzu'
                )}
              >
                {plan.cta}
              </a>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Icons.check className={`h-6 w-5 flex-none text-${plan.mostPopular ? 'yuzu' : 'primary'}`} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </LandingCard>
          ))}
        </div>
      </div>
    </div>
  )
}
