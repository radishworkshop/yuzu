import * as fs from 'fs'
import path from 'path'
import { Config } from '@/src/utils/get-config'
import ora from 'ora'
import chalk from 'chalk'

interface Dictionary { 
  [key: string]: string
}

export const updateDictionaries = (messages: string[], config: Config, cwd: string) => {
  if (!fs.existsSync(config.resources)) {
    fs.mkdirSync(config.resources, { recursive: true })
  }

  const spinner = ora(`${chalk.cyan(` Updating ${config.locales.length} locales...`)}`).start()

  config.locales.forEach((locale) => {
    const dictionaryPath = path.resolve(cwd, `${config.resources}/${locale.code}.json`)
    let oldDictionary: Dictionary = {}

    // if it exists, treat it as a starting point
    if (fs.existsSync(dictionaryPath)) {
      spinner.text = `${chalk.cyan(` Updating ${dictionaryPath}`)}`
      oldDictionary = JSON.parse(fs.readFileSync(dictionaryPath, 'utf8'))
    }
    else {
      spinner.text = `${chalk.cyan(` Creating ${dictionaryPath}`)}`
    }

    const dictionary: Dictionary = {}

    const isDefault = locale.code === config.defaultLocale
    messages.forEach((message) => {
      if (oldDictionary[message]) {
        dictionary[message] = oldDictionary[message]
      }
      else {
        dictionary[message] = isDefault ? message : ''
      }
    })

    fs.writeFileSync(dictionaryPath, JSON.stringify(dictionary))
  })

  spinner.succeed(` ${chalk.cyan(`Updated ${config.locales.length} locales with ${messages.length} keys`)}`)
}