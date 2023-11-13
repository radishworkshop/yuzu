import { Command } from 'commander'
import { logger } from '@/src/utils/logger'
import axios from 'axios'
import z from 'zod'
import chalk from 'chalk'
import * as fs from 'fs'
import path from 'path'
import { Config, getConfig } from '@/src/utils/get-config'
import { getOrigin } from '@/src/cli'
import { getRequestConfig } from '@/src/utils/api'

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
    const defaultLocale = config.locales[0].code
    const dictionaryPath = path.resolve(cwd, `${config.resources}/${defaultLocale}.json`)
    const dictionary = JSON.parse(fs.readFileSync(dictionaryPath, 'utf8'))
    const messages = Object.keys(dictionary)

    const locales = config.locales

    logger.info(`🍋 Syncing ${chalk.cyan(messages.length)} keys.`)
    const { data } = await axios.post(getOrigin() + '/api/push', {
      locales,
      messages,
    }, getRequestConfig())

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