import { Command } from 'commander'
import { logger } from '@/src/utils/logger'
import axios from 'axios'
import z from 'zod'
import chalk from 'chalk'
import * as fs from 'fs'
import path from 'path'
import { Config, getConfig } from '@/src/utils/get-config'
import { ORIGIN } from '@/src/utils/templates'

const buildOptionsSchema = z.object({
  cwd: z.string(),
})

export const pushCommand = new Command()
  .name('push')
  .description('sync local translation keys to your Yuzu project')
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd()
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

    await push(config, cwd)

  })

export const push = async (config: Config, cwd: string, verbose?: boolean) => {
  try {
    const dictionaryPath = path.resolve(cwd, `${config.resources}/${config.defaultLocale}.json`)
    const dictionary = JSON.parse(fs.readFileSync(dictionaryPath, 'utf8'))
    const messages = Object.keys(dictionary)

    const apiKey = process.env.YUZU_API_KEY
    const defaultLocale = config.defaultLocale
    const locales = config.locales

    logger.info(`🍋 Syncing ${chalk.cyan(messages.length)} keys.`)
    const { data } = await axios.post(ORIGIN + '/api/cli/push', {
      defaultLocale,
      locales,
      messages,
      apiKey,
    })
    if (data.success) {
      logger.info(`🍋 Pushed keys to project`)
    }
    else {
      logger.error(`🍋 Failed: ${data.error}`)
    }

  } catch (err) {
    logger.error(`Failed to push translation keys: `, err)
  }
}