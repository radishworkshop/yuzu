import React from 'react'
import "@/styles/globals.css"
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from "next"
import { cn } from "@/lib/utils"
import { ClerkProvider } from '@clerk/nextjs'
import { GeistSans } from "geist/font/sans";
import ThemeProvider from "@/components/misc/theme-provider"
import { TailwindIndicator } from "@/components/misc/tailwind-indicator"
import { SiteFooter } from '@/components/misc/site-footer'
import { twitterMetadata, siteMetadata } from '@/config/site'
import { layoutAppearance } from '@/config/clerk';

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
            GeistSans.className
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