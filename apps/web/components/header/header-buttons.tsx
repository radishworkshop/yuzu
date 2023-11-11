import * as React from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link'
import { Icons } from '../misc/icons'
import { socialLinks } from "@/config/site"

const HeaderButtons = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
      <div ref={ref}
        className={cn(
          "flex items-center gap-x-4 pr-6",
          className
        )} {...props}>
        <Link
          href={socialLinks.twitter}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
            })}
          >
            <Icons.twitter className="h-5 w-5 fill-current" />
            <span className="sr-only">Twitter</span>
          </div>
        </Link>
        <ThemeToggle />
      </div>
))
HeaderButtons.displayName = "Header Buttons"

export { HeaderButtons }
