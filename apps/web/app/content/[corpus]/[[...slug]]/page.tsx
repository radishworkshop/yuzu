import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"

import "@/styles/mdx.css"
import type { Metadata } from "next"
import { ChevronRight } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'

import { getTableOfContents } from "@/lib/content/toc"
import { absoluteUrl, cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Mdx } from "@/components/content/mdx-components"
import { DocsPager } from "@/components/content/pager"
import { DashboardTableOfContents } from "@/components/content/toc"
import { siteMetadata, twitterMetadata } from '@/config/site'
import { Badge } from '@/components/ui/badge'

export interface ContentPageProps {
  params: {
    slug: string[]
    corpus: string
  }
}

export async function getDocFromParams({ params }: ContentPageProps) {
  const slug = `/${params.corpus}/${params.slug?.join('/')}`

  const doc = allDocs.find((doc) => doc.slug === slug )
  return doc?.published ? doc : null
}

export async function generateMetadata({
  params,
}: ContentPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params })

  if (!doc) {
    return {}
  }

  return {
    title: doc.title + ' - Yuzu.JS',
    description: doc.description,
    metadataBase: new URL(siteMetadata.url),
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [{
          url: doc.image || siteMetadata.openGraph.images[0],
          width: 1200,
          height: 630,
          alt: siteMetadata.title,
      }],
    },
    twitter: twitterMetadata,
  }
}

export default async function DocPage({ params }: ContentPageProps) {
  const doc = await getDocFromParams({ params })

  const corpusName = params.corpus.charAt(0).toUpperCase() + params.corpus.slice(1)

  if (!doc) {
    notFound()
  }

  const toc = await getTableOfContents(doc.body.raw)
  return (
    <main className="w-full mx-auto flex gap-12 px-4 py-8">
      <div className="w-full min-w-[300px]">
        {['docs'].includes(corpusName) && (
          <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              {corpusName}
            </div>
            <ChevronRight className="h-4 w-4" />
            <div className="font-medium text-foreground">{doc.title}</div>
          </div>
        )}
        <div>
          {doc.date && (
            <div className="text-sm mb-2">
              {doc.date}
            </div>
          )}
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {doc.title}
          </h1>
          {doc.author && (
            <Link href={doc.authorLink || '#'}>
              <Badge variant='secondary' className="mt-2 pl-0.5 gap-2 shadow-lg hover:bg-border">
                {doc.authorImage && (
                  <Image src={doc.authorImage} width={40} height={40} alt="Author image" className="rounded-full flex-none w-4 h-4 mt-0" />
                )}
                {doc.author}
              </Badge>
            </Link>
          )}
        </div>
        <Separator className="my-4 md:my-6" />
        <Mdx code={doc.body.code} />
        <Separator className="my-4 md:my-6" />
        <DocsPager doc={doc} />
      </div>
      <div className="hidden text-sm w-[240px] flex-none xl:block">
        <div className="sticky top-24 overflow-hidden px-4">
          <ScrollArea className="pb-10">
            <DashboardTableOfContents toc={toc} />
          </ScrollArea>
        </div>
      </div>
    </main>
  )
}