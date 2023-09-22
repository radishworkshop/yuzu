import { Command } from 'commander'
import { logger } from '@/src/utils/logger'
import { getFilesFromGlobs } from '@/src/utils/get-files'
import ora from 'ora'
import z from 'zod'
import chalk from 'chalk'
import * as fs from 'fs'
import path from 'path'
import { scanMessages } from '@/src/utils/scan-messages'
import { updateDictionaries } from '@/src/utils/update-dictionaries'
import { Config, getConfig } from '@/src/utils/get-config'
import { CLIENT, SERVER } from '@/src/utils/templates'

const buildOptionsSchema = z.object({
  cwd: z.string(),
  verbose: z.boolean().optional(),
})

export const buildCommand = new Command()
  .name('build')
  .description('compile strings and supporting files in your project')
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

    logger.info('🍋 Scanning files...')

    const config = await getConfig(cwd)
    if (!config) {
      logger.error('No config file found.')
      return
    }

    build(config, cwd, !!options.verbose)
  })


export const build = (config: Config, cwd: string, verbose?: boolean) => {
  try {
    if (!config.content) {
      logger.error('No content glob array found in config file.')
      return
    }

    const files = getFilesFromGlobs(cwd, config.content, ['**/node_modules/**', '**/.next/**'])

    const spinner = ora(` ${chalk.cyan(`Parsing ${files.length} content files...`)}`).start()

    const messages = files.map((file, index) => {
      spinner.text = ` ${chalk.cyan(`Parsed ${index + 1} / ${files.length} content files`)}`
      verbose && logger.info(`🍋 Scanning ${chalk.cyan(file)}`)

      return scanMessages(file, config.transformers)
    }).flat()

    spinner.succeed()
    updateDictionaries(messages.filter((message, index) => messages.indexOf(message) === index), config, cwd)

    const extension = config.tsx ? 'ts' : 'js'

    verbose && logger.info(`🍋 Updating server.${extension} and client.${extension}`)
    fs.writeFileSync(`${config.resources}/client.${extension}`, CLIENT(config))
    fs.writeFileSync(`${config.resources}/server.${extension}`, SERVER(config))
  } catch (err) {
    logger.error(`Failed to build resources. Have you run \`init\`?`, err)
  }
}