import * as fs from 'fs'
import path from 'path'
import { Config } from '@/src/utils/get-config'
import { logger } from '@/src/utils/logger'

const sanitize = (str: string) => {
  return str.replaceAll('\'', '\\\'')
}

interface Dictionary { 
  [key: string]: string
}

export const updateDictionaries = (messages: string[], config: Config, cwd: string) => {

  if (!fs.existsSync(config.resources)) {
    fs.mkdirSync(config.resources, { recursive: true })
  }

  config.locales.forEach((locale) => {
    const dictionaryPath = path.resolve(cwd, `${config.resources}/${locale.code}.json`)
    let oldDictionary: Dictionary = {}

    // if it exists, treat it as a starting point
    if (fs.existsSync(dictionaryPath)) {
      logger.info(`Updating ${dictionaryPath}`)
      oldDictionary = JSON.parse(fs.readFileSync(dictionaryPath, 'utf8'))
    }
    else {
      logger.info(`Creating ${dictionaryPath}`)
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
}