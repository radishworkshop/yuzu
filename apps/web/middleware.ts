import { NextResponse } from 'next/server'
import { authMiddleware } from "@clerk/nextjs";

const contentFolders = ['docs', 'blog', 'resources']
const publicContentRoutes = contentFolders.map((route) => [`/${route}`, `/${route}/(.*)`]).flat()

export default authMiddleware({

  beforeAuth: (req) => {
    if (req.nextUrl.pathname === '/discord') {
      return NextResponse.redirect('https://discord.gg/dR4N3T6Csr')
    }

    for (let i = 0; i < contentFolders.length; i++) {
      const route = contentFolders[i]
      if (req.nextUrl.pathname.startsWith(`/${route}`)) {
        let newUrl = req.url.replace(`/${route}`, `/content/${route}`)
        if (req.nextUrl.pathname === `/${route}`) {
          newUrl += '/home'
        }
        return NextResponse.rewrite(new URL(newUrl))
      }
    }
  },

  publicRoutes: [
    '/', '/home',
    ...publicContentRoutes,
    '/pricing', '/about',
    '/api/(.*)'
  ],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}