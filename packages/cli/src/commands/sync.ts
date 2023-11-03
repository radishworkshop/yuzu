import { Command } from 'commander'
import { logger } from '@/src/utils/logger'
import ora from 'ora'
import z from 'zod'
import * as fs from 'fs'
import path from 'path'
import { getConfig } from '@/src/utils/get-config'
import { build } from '@/src/commands/build'
import { push } from '@/src/commands/push'
import { pull } from '@/src/commands/pull'

const buildOptionsSchema = z.object({
  cwd: z.string(),
  verbose: z.boolean().optional(),
})

export const syncCommand = new Command()
  .name('sync')
  .description('build, push, and pull to sync all strings locally and with the Yuzu project')
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd()
  )
  .option(
    '--verbose',
    'log additional output.',
  )
  .action(async (opts) => {
    const options = buildOptionsSchema.parse({
      ...opts,
    })

    const cwd = path.resolve(options.cwd)

    if (!fs.existsSync(cwd)) {
      logger.error(`The path ${cwd} does not exist. Please try again.`)
      process.exit(1)
    }

    const config = await getConfig(cwd)
    if (!config) {
      logger.error('No config file found.')
      return
    }

    const spinner = ora(`Syncing codebase and Yuzu project`).start()
    build(config, cwd, !!options.verbose)
    await push(config, cwd, !!options.verbose)
    await pull(config, cwd, !!options.verbose)
    spinner.succeed()

  })