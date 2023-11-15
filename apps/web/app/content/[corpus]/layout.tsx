import { contentConfig } from "@/config/content"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DocsSidebarNav } from "@/components/content/sidebar-nav"
import { SiteHeader } from '@/components/ui/site-header'
import { mainNav } from '@/config/site'
import { currentUser } from '@clerk/nextjs'

interface ContentLayoutProps {
  children: React.ReactNode
  params: {
    corpus: string
  }
}

export default async function ContentLayout({ children, params }: ContentLayoutProps) {
  const corpus = params.corpus
  const user = await currentUser()

  if (['blog', 'resources'].includes(corpus)) {
    return (
      <>
        <SiteHeader user={user} topLinks={mainNav} />
        <div className="container max-w-4xl mx-auto xl:max-w-6xl">
          {children}
        </div>
      </>
    )
  }
  else if (corpus === 'docs') {
    return (
      <>
        <SiteHeader user={user} topLinks={mainNav} sideLinks={contentConfig[corpus].sidebarNav}/>
        <div className="flex">
          <div className="hidden md:block">
            <aside className="sticky top-16 pl-8 w-[320px] min-h-screen border-r overflow-y-auto">
              <ScrollArea className="p-8">
                <DocsSidebarNav items={contentConfig[corpus].sidebarNav} />
              </ScrollArea>
            </aside>
          </div>
          <div className="w-full px-4 mx-auto">
            {children}
          </div>
        </div>
      </>
    )
  }
}