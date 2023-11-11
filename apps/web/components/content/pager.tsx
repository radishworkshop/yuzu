import Link from "next/link"
import { Doc } from "contentlayer/generated"
import { NavItem, NavItemWithChildren } from "types/nav"

import { contentConfig } from "@/config/content"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/misc/icons"

interface DocsPagerProps {
  doc: Doc
}

export function DocsPager({ doc }: DocsPagerProps) {
  const pager = getPagerForDoc(doc)

  if (!pager) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-between gap-4">
      {pager?.prev?.href ? (
        <Link
          href={pager.prev.href}
          className={buttonVariants({ variant: "outline" })}
        >
          <Icons.chevronLeft className="flex-none mr-2 h-4 w-4" />
          {pager.prev.title}
        </Link>
      ): (
        <div></div>
      )}
      {pager?.next?.href && (
        <Link
          href={pager.next.href}
          className={buttonVariants({ variant: "outline" }) + " max-w-[140px] sm:max-w-none"}
        >
          <div className="text-ellipsis whitespace-nowrap overflow-hidden">
            {pager.next.title}
          </div>
          <Icons.chevronRight className="flex-none ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  )
}

export function getPagerForDoc(doc: Doc) {
  const corpus = doc.slug.split('/')[1]
  if (corpus === 'docs') {
    const config = contentConfig[corpus]
    const flattenedLinks = [null, ...flatten(config.sidebarNav), null]
    const activeIndex = flattenedLinks.findIndex(
      (link) => {
        return doc.slug === link?.href
      }
    )
    const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
    const next =
      activeIndex !== flattenedLinks.length - 1
        ? flattenedLinks[activeIndex + 1]
        : null
    return {
      prev,
      next,
    }
  }
  else {
    return null
  }
}

export function flatten(links: NavItemWithChildren[]): NavItem[] {
  return links
    .reduce<NavItem[]>((flat, link) => {
      return flat.concat(link.items?.length ? flatten(link.items) : link)
    }, [])
    .filter((link) => !link?.disabled)
}
