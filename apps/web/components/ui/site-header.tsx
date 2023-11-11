import Link from "next/link"
import { Icons } from "@/components/misc/icons"
import { User } from '@/types/user'
import { Button } from '@/components/ui/button'
import { ClerkLoaded, SignUpButton } from '@clerk/nextjs'
import ThemedUserButton from '@/components/ui/themed-user-button'
import { MainNavItem, SidebarNavItem } from '@/types/nav'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet"
import ThemedModalSignIn from './themed-modal-sign-in'

interface SiteHeaderProps { 
  user?: User | null
  fixed?: boolean
  fadeIn?: boolean
  className?: string
  topLinks?: MainNavItem[]
  sideLinks?: SidebarNavItem[]
}

interface LinkListProps {
  id: string
  className?: string
  links: (MainNavItem | SidebarNavItem)[]
}

function LinkList({ className, links, id }: LinkListProps) {
  return (
    <div className={className}>
      {links.map((link, i) => (
        <div className="px-2" key={`${id}-${link.title}`}>
          { link.href ? (
            <>
              { id === 'mobile' ? (
                <SheetClose asChild>
                  <Link className="text-sm text-muted-foreground hover:text-primary" href={link.href}>{link.title}</Link>
                </SheetClose>
              ) : (
                <Link className="text-sm text-muted-foreground hover:text-primary" href={link.href}>{link.title}</Link>
              )}
            </>
          ) : (
            <h4 className="text-sm mt-6 rounded-md text-base font-bold">{link.title}</h4>
          )}
        </div>
      ))}
    </div>
  )
}

export function SiteHeader({ user, topLinks, sideLinks, fixed, fadeIn, className }: SiteHeaderProps) {

  let listLinks: (MainNavItem | SidebarNavItem)[] = []

  sideLinks?.forEach((item) => {
    listLinks.push(item)
    if (item.items) {
      item.items.forEach((littleItem) => {
        listLinks.push(littleItem)
      })
    }
  })

  return (
      <header className={`${fixed ? 'fixed' : 'sticky'} top-0 z-50 w-full h-16 ${className}`}>
        <ClerkLoaded>
          <div className={`w-full h-16 border-b backdrop-blur-sm bg-background/20 ${fadeIn ? 'animate-fade-in' : ''}`}>
            <nav className="h-16 flex items-center justify-between">
              <div className="flex items-center gap-2 px-4 md:px-20">
                {/* mobile menu */}
                {listLinks.length > 0 && (
                  <div className="md:hidden">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" className="px-2">
                          <Icons.menu className="w-6 h-6" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="p-12 overflow-y-auto">
                        <SheetHeader>
                          <SheetTitle>
                            <Link href="/" className="flex-none"><Icons.yuzu className="w-20 h-6" /></Link>
                          </SheetTitle>
                        </SheetHeader>
                        <LinkList className="flex flex-col mt-8 gap-3" links={listLinks} id={'mobile'} />
                      </SheetContent>
                    </Sheet>
                  </div>
                )}

                <div className="flex-none px-2">
                  <Link href="/"><Icons.yuzu className="w-20 h-6" /></Link>
                </div>
                { user ? (
                  <div className="flex items-center">
                    <Icons.slash className="flex-none text-border" />
                    <ThemedUserButton />
                  </div>
                ) : (
                  <LinkList className="text-base hidden font-bold md:flex items-center ml-8 gap-8" links={topLinks || []} id={'desktop-left'} />
                )}
              </div>

              <div className="flex items-center mr-6 md:mr-20">
                { user ? (
                  <LinkList className="text-base hidden font-bold md:flex items-center ml-8 gap-8" links={topLinks || []} id={'desktop-right'} />
                ): (
                  <div className="flex flex-none items-center gap-2 font-bold text-sm text-center">
                    <ThemedModalSignIn className="hidden xs:block" />
                    <SignUpButton>
                      <Button variant="yuzu" className="rounded-full h-[36px] w-[108px]">Sign up</Button>
                    </SignUpButton>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </ClerkLoaded>
      </header>
  )
}