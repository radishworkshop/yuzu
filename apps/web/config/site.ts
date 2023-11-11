import { MainNavItem } from '@/types/nav'

export const mainNav: MainNavItem[] = [{
  title: "Docs",
  href: "/docs",
}, {
  title: "Blog",
  href: "/blog",
}, {
  title: "Pricing",
  href: "/pricing",
}]

export const siteMetadata = {
  title: 'Yuzu',
  description: 'Localize NextJS apps in a snap',
  metadataBase: new URL('https://www.yuzujs.com'),
  icons: [
    { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
  ],
  url: "https://www.yuzujs.com",
  openGraph: {
    images: ['/images/dist/banner.jpg'],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  mainNav: mainNav,
}

export const twitterMetadata = {
  card: 'summary_large_image',
  title: siteMetadata.title,
  description: siteMetadata.description,
  creator: '@zackrw',
  images: siteMetadata.openGraph.images,
}

export const socialLinks = {
  discord: '/discord',
  twitter: 'https://twitter.com/yuzujs__',
  github: 'https://github.com/radishworkshop/yuzu',
}

export const footerLinks = [{
  name: 'Product',
  links: [{
    name: 'Home',
    href: '/home',
  }, {
    name: 'Blog',
    href: '/blog',
  }, {
    name: 'Pricing',
    href: '/pricing',
  }]
}, {
  name: 'Resources',
  links: [{
    name: 'Community',
    href: '/discord',
  }, {
    name: 'Contact',
    href: 'mailto:contact@yuzujs.com',
  }, {
    name: 'Terms of use',
    href: '/resources/terms-of-use',
  }, {
    name: 'Report an issue',
    href: 'mailto:contact@yuzujs.com',
  }]
}, {
  name: 'Developers',
  links: [{
    name: 'Documentation',
    href: '/docs',
  }, {
    name: 'Status',
    href: 'https://yuzu.openstatus.dev',
  }, {
    name: 'GitHub',
    href: 'https://www.github.com/radishworkshop/yuzu',
  }, {
    name: 'NPM',
    href: 'https://www.npmjs.com/package/yuzu',
  }]
}]