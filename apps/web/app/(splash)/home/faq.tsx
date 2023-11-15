'use client'

import Link from 'next/link'
import { LandingCard } from '@/components/ui/card'
import { Icons } from '@/components/misc/icons'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useEffect, useRef, useState } from 'react'

interface FAQItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ title, children, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // @ts-ignore
    const classes = ref.current?.querySelector('.chevron')?.classList
    isOpen ? classes?.add('rotate-180') : classes?.remove('rotate-180')
  }, [isOpen])

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      ref={ref}
      className={className}
    >
      <CollapsibleTrigger className="w-full">
        <div className="flex gap-6 p-6 text-left text-lg">
          { title }
          <Icons.chevronDown className="chevron ml-auto flex-none transition-all" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="little-text">
        { children }
      </CollapsibleContent>
    </Collapsible>
  )
}

const faq = [{
  question: 'Which translation engines does Yuzu integrate with?',
  answer: (<div>
    Yuzu integrates natively with DeepL and Google Translate, and offers access to GPT-4 via Codesheets.
  </div>)
}, {
  question: 'How does Yuzu decide which combination of translation engines to use for each translation?',
  answer: (<div>
    Currently the decision is purely a function of the language pair. For example, en &rarr; fr will use DeepL, while en &rarr; ar will use Google Translate.
  </div>)
}, {
  question: 'Does Yuzu support NextJS App Directory?',
  answer: (<div>
    Yes. Yuzu itself is built entirely with App Directory, and we seamlessly support next-international, which is designed to support App Directory since its inception.
    However, you can still use Pages Directory, and it will work just as seamlessly.
  </div>)
}, {
  question: 'Does Yuzu support TypeScript?',
  answer: (<div>
    Yes. The Yuzu website and the Yuzu CLI are written in TypeScript, and we recommend the typesafe library next-international. We highly recommend TypeScript for i18n, and we think
    Yuzu works best when you use TypeScript.
  </div>)
}, {
  question: 'Can I use Yuzu with another i18n library?',
  answer: (<div>
    There are a number of great i18n libraries, and Yuzu is designed to work seamlessly with
    them, not to replace them.
    If you use NextJS, we have built in support for next-international and recommend that, but the build process is completely customizable.
  </div>)
}, {
  question: 'Can I use Yuzu with another TMS?',
  answer: (<div>
    Definitely. It&apos;s not uncommon to use Yuzu as a cost-effective &quot;first pass&quot; and then 
    follow-up with a translation agency or populate another Translation Management Service (TMS) with the results.
    Yuzu is designed to fit into your workflow. We do offer expert review and a spreadsheet-style UI as well,
    so you can use Yuzu as a one-stop shop. We are here to help, but it is entirely up to you.
  </div>)
}, {
  question: 'Does yuzujs.com use Yuzu?',
  answer: (<div>
    Of course! Thanks to Yuzu, <Link className="underline" href="https://github.com/QuiiBz/next-international">next-international</Link>, and other great tools, this website is available in XXX different languages.
  </div>)
}, {
  question: 'How do I integrate Yuzu into my application?',
  answer: (<div>
    Because Yuzu is a self-contained command-line workflow, it is designed
    to work with any web framework and internationalization (i18n) library.

    For certain libraries like <Link href="https://next-international.vercel.app/">next-international</Link>, Yuzu also manages updating library files for you.

    We also provide a number of convenient components for React, such as the{' '}
    <code className="text-yuzu text-sm py-1 px-2 border rounded-lg">{'<Switcher />'}</code>.
  </div>)
}]


export default function FAQ() {
  return (
    <div className="relative border-t py-28">
      <div className="mx-auto max-w-xl md:max-w-3xl lg:max-w-7xl px-6 lg:px-8">
        <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-br from-yuzu to-grapefruit brighten-110">FAQ</h2>
        <p className="mt-2 font-bold tracking-tight text-4xl">Frequently Asked Questions</p>

        <LandingCard className="my-8 w-full divide-y rounded-2xl">
          {faq.map((item, index) => (
            <FAQItem key={index} title={item.question}>
              <p className="ml-6 mr-16 pb-6 text-muted-foreground">
                {item.answer}
              </p>
            </FAQItem>
          ))}
        </LandingCard>
      </div>
    </div>
  )
}
