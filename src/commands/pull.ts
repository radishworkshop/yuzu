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

export const pullCommand = new Command()
  .name('pull')
  .description('sync Yuzu project translations locally')
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

    const config = await getConfig(cwd)
    if (!config) {
      logger.error('No config file found.')
      return
    }

    await pull(config, cwd)

  })

export const pull = async (config: Config, cwd: string, verbose?: boolean) => {
  try {
    const dictionaryPath = path.resolve(cwd, `${config.resources}/${config.defaultLocale}.json`)
    const dictionary = JSON.parse(fs.readFileSync(dictionaryPath, 'utf8'))
    const messages = Object.keys(dictionary)
    const apiKey = process.env.YUZU_API_KEY

    logger.info(`🍋 Pulling translations for ${chalk.cyan(messages.length)} keys.`)
    const { data } = await axios.post(ORIGIN + '/api/cli/pull', {
      messages,
      apiKey,
    })

    if (data.error) {
      logger.error(`🍋 Failed: ${data.error}`)
    }
    else {
      Object.entries(data).forEach(([code, pulledDictionary]) => {
        const filePath = path.resolve(cwd, `${config.resources}/${code}.json`)
        fs.writeFileSync(filePath, JSON.stringify(pulledDictionary))
      })
    }
  } catch (err) {
    logger.error(`Failed to pull translation values: `, err)
  }
}