'use client'

import { UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

export default function ThemedUserButton() { 
  const { resolvedTheme } = useTheme()
  return (
    <UserButton afterSignOutUrl="/" appearance={{
      baseTheme: resolvedTheme === 'dark' ? dark : undefined,
      elements: {
        userButtonTrigger: 'h-8 w-8 p-0.5 rounded-full shadow-lg ring-2 ring-background',
      }
    }} />
  )
}