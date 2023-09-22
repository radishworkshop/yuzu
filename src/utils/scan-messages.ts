import fs from 'fs'
import { logger } from '@/src/utils/logger'
import { parse } from '@babel/parser'
import traverse, { NodePath } from '@babel/traverse'
import * as t from '@babel/types'

const captureArguments = (nodePath: NodePath<t.CallExpression>, transformers: string[]) => {
  if (t.isIdentifier(nodePath.node.callee)) {
    const functionName = nodePath.node.callee.name
    if (transformers.includes(functionName)) {
      const args = nodePath.node.arguments.map(arg => {
        // Here you can capture the argument as string, identifier, etc.
        return t.isStringLiteral(arg) ? arg.value : arg.type
      })
      return args[0]
    }
  }
}

export const scanMessages = (file: string, transformers: string[]) => {
  const messages: string[] = []
  const content = fs.readFileSync(file, 'utf8')

  try {
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    })

    traverse(ast, {
      CallExpression: (nodePath) => {
        const result = captureArguments(nodePath as NodePath<t.CallExpression>, transformers)
        if (result) {
          messages.push(result)
        }
      },
    })
  } catch (e) {
    logger.warn(`Error parsing ${file}: ${e}\nSkipping file...`)
  }

  return messages
}