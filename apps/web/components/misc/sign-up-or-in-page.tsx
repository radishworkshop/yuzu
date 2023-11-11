'use client'

import { SignUp, SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { layoutAppearance } from '@/config/clerk';

export default function SignUpOrInPage({ which }: { which: 'up' | 'in' }) {
  const { resolvedTheme } = useTheme()
  const appearance = {
    baseTheme: resolvedTheme === 'dark' ? dark : undefined,
    elements: {
      rootBox: 'mx-auto',
    },
  }
  return (
    <div className="flex min-w-[300px]">
      <div className="bg-background pt-8 pb-16 min-h-screen w-full flex-none z-10 flex items-center">
        { which === 'up' && <SignUp appearance={appearance} /> }
        { which === 'in' && <SignIn appearance={appearance} /> }
      </div>
    </div>
  )
}