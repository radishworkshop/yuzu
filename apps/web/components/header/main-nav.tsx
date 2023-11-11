'use client'

import * as React from "react"
import Link from "next/link"
import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'
import { CommandMenu } from "@/components/header/command-menu"
import { HeaderButtons } from '@/components/header/header-buttons'

interface MainNavProps {
  items?: NavItem[],
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()
  return (
    <>
      <div className="flex-1 gap-6 md:gap-10 justify-end px-4 hidden sm:block">
        {items?.length ? (
          <nav className="hidden gap-8 md:flex justify-end">
            {items?.map(
              (item, index) =>
                (item.href && !pathname?.startsWith(item.href)) && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}
      </div>
      { pathname?.startsWith('/docs') &&
        <div className="w-full hidden md:flex-none md:w-auto md:block">
          <CommandMenu />
        </div>
      }
      <HeaderButtons className="hidden md:flex" />
    </>
  )
}