import React from 'react'
import "@/styles/globals.css"
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from "next"
import { cn } from "@/lib/utils"
import { ClerkProvider } from '@clerk/nextjs'
import LocalFont from 'next/font/local'
import ThemeProvider from "@/components/misc/theme-provider"
import { TailwindIndicator } from "@/components/misc/tailwind-indicator"
import { SiteFooter } from '@/components/misc/site-footer'
import { twitterMetadata, siteMetadata } from '@/config/site'
import { layoutAppearance } from '@/config/clerk';

const codecPro = LocalFont({
  src: [{
    path: '../fonts/Codec-Pro-Regular.otf',
    weight: '400',
    style: 'normal'
  }, {
    path: '../fonts/Codec-Pro-Italic.otf',
    weight: '400',
    style: 'italic'
  }, {
    path: '../fonts/Codec-Pro-Bold.otf',
    weight: '700',
    style: 'normal'
  }, {
    path: '../fonts/Codec-Pro-Bold-Italic.otf',
    weight: '700',
    style: 'italic'
  }, {
    path: '../fonts/Codec-Pro-Extrabold.otf',
    weight: '900',
    style: 'normal'
  }],
  display: 'block',
  fallback: ['Helvetica Neue', 'Helvetica', 'sans-serif', 'system-ui']
})

export const metadata: Metadata = {
  ...siteMetadata,
  twitter: twitterMetadata,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <ClerkProvider appearance={layoutAppearance}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-w-[300px] min-h-screen bg-background antialiased",
            codecPro.className
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen">
              {children}
            </div>
            <SiteFooter />
            <TailwindIndicator />
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}