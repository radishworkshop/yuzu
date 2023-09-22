import * as fs from 'fs'
import path from 'path'
import { Config, getConfig } from '@/src/utils/get-config'
import { handleError } from '@/src/utils/handle-error'
import { logger } from '@/src/utils/logger'
import { Command } from 'commander'
import ora from 'ora'
import * as z from 'zod'
import axios from 'axios'
import { ORIGIN } from '@/src/utils/templates'
import { build } from '@/src/commands/build'
import { push } from '@/src/commands/push'
import { pull } from '@/src/commands/pull'

const initOptionsSchema = z.object({
  cwd: z.string(),
})

export const translateCommand = new Command()
  .name('translate')
  .description('Sync command but translate all strings before pulling, so that every message is translated')
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd()
  )
  .action(async (opts) => {
    try {
      const options = initOptionsSchema.parse(opts)
      const cwd = path.resolve(options.cwd)

      // Ensure target directory exists
      if (!fs.existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`)
        process.exit(1)
      }

      // Read config
      const config = await getConfig(cwd)

      if (!config) {
        logger.error('No config file found.')
        return
      }

      logger.info(`🍋 Syncing and translating codebase and Yuzu project`)
      build(config, cwd)
      await push(config, cwd)
      await translate(config, cwd)
      await pull(config, cwd)

    } catch (error) {
      handleError(error)
    }
  })

  const translate = async (config: Config, cwd: string) => {
    const apiKey = process.env.YUZU_API_KEY
    const defaultLocale = config.defaultLocale
    const locales = config.locales.map(locale => locale.code)

    const spinner = ora(`Translating messages...`).start()
    await axios.post(ORIGIN + '/api/cli/translate-all', {
      locales,
      defaultLocale,
      apiKey
    })

    spinner.succeed()
  }
