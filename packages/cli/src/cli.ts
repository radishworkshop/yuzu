#!/usr/bin/env node
import { initCommand } from '@/src/commands/init'
import { createCommand } from '@/src/commands/create'
import { buildCommand } from '@/src/commands/build'
import { pushCommand } from '@/src/commands/push'
import { pullCommand } from '@/src/commands/pull'
import { translateCommand } from '@/src/commands/translate'
import dotenv from 'dotenv';
import { Command } from 'commander'
import { getPackageInfo } from '@/src/utils/get-package-info'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

export const loadEnv = (paths: string[]) => {
  for (const path of paths) {
    dotenv.config({ path });
  }
}

export function getOrigin() {
  return process.env.YUZU_ORIGIN || 'https://www.yuzujs.com'
}

async function main() {
  const packageInfo = getPackageInfo()
  loadEnv(['.env', `.env.${process.env.NODE_ENV}`, '.env.local'])

  const program = new Command()
    .name('yuzujs')
    .description('Command line interface for the yuzujs.com localization toolset')
    .version(
      packageInfo.version || '1.0.0',
      '-v, --version',
      'display the version number'
    )
  
  program.addCommand(initCommand)
  program.addCommand(createCommand)
  program.addCommand(buildCommand)
  program.addCommand(pushCommand)
  program.addCommand(pullCommand)
  program.addCommand(translateCommand)
  
  program.parse()
}

main()