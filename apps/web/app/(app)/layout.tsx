import { currentUser } from '@clerk/nextjs'
import { SiteHeader } from '@/components/ui/site-header'
import { mainNav } from '@/config/site'

interface AppLayoutProps {
  children: React.ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const user = await currentUser()

  return (
    <div className="min-h-screen">
      <SiteHeader user={user} topLinks={mainNav} />
      {children}
    </div>
  )
}