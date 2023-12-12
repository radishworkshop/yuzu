import { siteName, socialLinks, footerLinks } from "@/config/site"
import { Icons } from "@/components/misc/icons"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t py-14 flex flex-col justify-between">
      <div className="grid grid-cols-2 mx-auto gap-8 min-w-[300px] sm:grid-cols-4 md:gap-16 lg:max-w-7xl lg:grid-cols-6 xl:max-w-[96rem] xl:grid-cols-7">
        <div className="col-span-2 flex flex-col gap-6 justify-between xl:col-span-3">
          <div>
            <div className="flex items-center gap-4">
              <Icons.logo className="h-6 w-6" />
              <h2 className="text-lg font-extrabold">{siteName}</h2>
            </div>
            <p className="text-sm mt-2 leading-loose text-muted-foreground">
              Planted by Radish Workshop. &copy; 2023.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href={socialLinks.discord} target="_blank">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Icons.discord className="w-5 h-auto" />
              </Button>
            </Link>
            <Link href={socialLinks.twitter} target="_blank">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Icons.twitter className="w-5 h-auto" />
              </Button>
            </Link>
            <Link href={socialLinks.github} target="_blank">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Icons.github className="w-5 h-auto" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="col-span-2 hidden sm:block lg:hidden"></div>
        <div className="col-span-1 hidden lg:block"></div>
        {footerLinks.map((section, i) => (
          <div key={section.name} className="col-span-1">
            <h3 className="text-sm font-bold mb-3">{section.name}</h3>
            { section.links.map((link, j) => (
              <div key={link.name} className="mb-3">
                <Link className="text-sm text-muted-foreground hover:text-primary" href={link.href}>{link.name}</Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </footer>
  )
}
