import fs from 'fs'
import path from 'path'
import { defineDocumentType, makeSource } from '@contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { rehypeComponent } from './lib/content/rehype-component'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import rehypePrettyCode from 'rehype-pretty-code'
import { visit } from 'unist-util-visit'

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `(docs|blog|resources)/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'string', required: false },
    author: { type: 'string', required: false },
    authorImage: { type: 'string', required: false },
    authorLink: { type: 'string', required: false },
    description: { type: 'string', required: true },
    image: { type: 'string', required: false },
    published: { type: 'boolean', default: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Doc],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeComponent,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children
            if (codeEl.tagName !== 'code') {
              return
            }
            if (codeEl.data?.meta) {
              // Extract event from meta and pass it down the tree.
              const regex = /event='([^']*)'/
              const match = codeEl.data?.meta.match(regex)
              if (match) {
                node.__event__ = match ? match[1] : null
                codeEl.data.meta = codeEl.data.meta.replace(regex, '')
              }
            }
            node.__rawString__ = codeEl.children?.[0].value
            node.__src__ = node.properties?.__src__
          }
        })
      },
      [rehypePrettyCode, {
        theme: {
          dark: JSON.parse(
            fs.readFileSync(path.resolve('./lib/content/themes/moonlight-ii.json'), 'utf-8')
          ),
          light: 'rose-pine-dawn',
        },
        onVisitLine(node: any) {
          if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }]
          }
        },
        onVisitHighlightedLine(node: any) {
          node.properties.className.push('line--highlighted')
        },
        onVisitHighlightedWord(node: any) {
          node.properties.className = ['word--highlighted']
        },
      }],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'div') {
            if (!('data-rehype-pretty-code-fragment' in node.properties)) {
              return
            }
            const preElement = node.children.at(-1)
            if (preElement.tagName !== 'pre') {
              return
            }
            preElement.properties['__withMeta__'] =
              node.children.at(0).tagName === 'div'
            preElement.properties['__rawString__'] = node.__rawString__
            if (node.__src__) {
              preElement.properties['__src__'] = node.__src__
            }
            if (node.__event__) {
              preElement.properties['__event__'] = node.__event__
            }
          }
        })
      },
      rehypeCodeTitles,
      rehypePrism,
      rehypeAutolinkHeadings,
      rehypeAccessibleEmojis,
    ],
  },
})