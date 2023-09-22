import { handleError } from '@/src/utils/handle-error'
import { logger } from '@/src/utils/logger'
import { Command } from 'commander'
import open from 'open'
import { ORIGIN } from '@/src/utils/templates'

export const createCommand = new Command()
  .name('init')
  .description('Open a web browser to create a Yuzu project for translation and collaboration on the web')
  .action(async (opts) => {
    create()
  })

export const create = () => {
  try {
    const url = `${ORIGIN}/new`
    logger.info(`🍋 Opening ${url}`)
    open(url)
  } catch (error) {
    handleError(error)
  }
}