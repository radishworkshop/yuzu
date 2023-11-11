'use client'

import { SignInButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function ThemedModalSignIn({ className }: { className?: string }) { 
  return (
    <div className={className}>
      <SignInButton mode="modal">
        <Button variant="ghost" className="rounded-full h-[36px]">Log in</Button>
      </SignInButton>
    </div>
  )
}


