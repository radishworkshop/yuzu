import { toc } from "mdast-util-toc"
import { remark } from "remark"
import { visit } from "unist-util-visit"
import { Node } from 'mdast-util-toc/lib'

const textTypes = ["text", "emphasis", "strong", "inlineCode"]

interface NodeProps {
  title: string
  type: string
  value: string
  url: string
  children: NodeProps[]
}

function flattenNode(node: NodeProps) {
  const p: string[] = []
  visit(node, (node) => {
    if (!textTypes.includes(node.type)) return
    p.push(node.value)
  })
  return p.join(``)
}

interface Item {
  title?: string
  url?: string
  items?: Item[]
}

interface Items {
  items?: Item[]
}

function getItems(node: NodeProps, current: Item): Items {
  if (!node) {
    return {}
  }

  if (node.type === "paragraph") {
    visit(node, (item) => {
      if (item.type === "link") {
        current.url = item.url
        current.title = flattenNode(node)
      }

      if (item.type === "text") {
        current.title = flattenNode(node)
      }
    })

    return current
  }

  if (node.type === "list") {
    current.items = node.children.map((i) => getItems(i, {}))

    return current
  } else if (node.type === "listItem") {
    const heading = getItems(node.children[0], {})

    if (node.children.length > 1) {
      getItems(node.children[1], heading)
    }

    return heading
  }

  return {}
}

interface FileProps {
  data: Items
}

const getToc = () => (node: Node, file: FileProps) => {
  const table = toc(node)
  file.data = getItems(table.map as NodeProps, {})
}

export type TableOfContents = Items

export async function getTableOfContents(
  content: string
): Promise<TableOfContents> {
  const result = await remark().use(getToc).process(content)

  return result.data
}