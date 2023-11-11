"use client"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/misc/icons"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="-ml-2 text-muted-foreground hover:text-primary"
    >
      <Icons.sun className="w-6 h-auto rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="w-6 h-auto absolute rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}