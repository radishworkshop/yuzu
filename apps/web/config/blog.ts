import { getDocFromParams } from '@/app/content/[corpus]/[[...slug]]/page'

const published = [
  'launching-yuzu-100-percent-open-source-localization-and-translation-management'
]

export const getBlogConfig = async () => {
  const config = await Promise.all(published.map(async (item) => {
    const slug = item.split('/')
    const doc = await getDocFromParams({ params: {
      slug: slug,
      corpus: 'blog',
    }})
    return {
      title: doc?.title,
      description: doc?.description,
      image: doc?.image,
      url: doc?.slug,
    }
  }))

  return config
}

export const blogConfig = [{
  image: "/images/content/landing-page.png",
  title: "Welcome to Yuzu",
  description: "Localize NextJS apps in a snap",
  href: "/blog/welcome-to-yuzu",
}]