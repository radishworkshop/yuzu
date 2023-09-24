import { existsSync, promises as fs } from 'fs'
import path from 'path'
import {
  DEFAULT_LOCALE_CODE,
  DEFAULT_LOCALE_NAME,
  getConfig,
  configSchema,
  resolveConfigPaths,
  type Config,
} from '@/src/utils/get-config'
import { handleError } from '@/src/utils/handle-error'
import { logger } from '@/src/utils/logger'
import * as templates from '@/src/utils/templates'
import chalk from 'chalk'
import { Command } from 'commander'
import ora from 'ora'
import prompts from 'prompts'
import * as z from 'zod'
import { build } from '@/src/commands/build'
import { create } from '@/src/commands/create'

const initOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
})

export const initCommand = new Command()
  .name('init')
  .description('Initialize a yuzu project with yuzu.config.js')
  .option('-y, --yes', 'skip confirmation prompt.', false)
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
      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`)
        process.exit(1)
      }

      // Read config
      const existingConfig = await getConfig(cwd)
      const config = await promptForConfig(cwd, existingConfig, options.yes)

      logger.info('')

      // Build the resources directory as well
      build(config, cwd, false)

      logger.info(
        `${chalk.green('Success!')} Project initialization completed.`
      )
      logger.info('')
    } catch (error) {
      handleError(error)
    }
  })

export async function promptForConfig(
  cwd: string,
  defaultConfig: Config | null = null,
  skip = false
) {
  const highlight = (text: string) => chalk.cyan(text)

  const frameworks = [{
    name: 'nextjs',
    label: 'NextJS',
  }, {
    name: 'astro',
    label: 'Astro',
  }, {
    name: 'svelte',
    label: 'SvelteKit',
  }, {
    name: 'other',
    label: 'Other',
  }]

  const options = await prompts([{
    type: 'toggle',
    name: 'typescript',
    message: `Would you like to use ${highlight('TypeScript')} (recommended)?`,
    initial: defaultConfig?.tsx ?? true,
    active: 'yes',
    inactive: 'no',
  }, {
    type: 'select',
    name: 'framework',
    message: `Which ${highlight('web framework')} are you using?`,
    choices: frameworks.map((framework) => ({
      title: framework.label,
      value: framework.name,
    })),
  }, {
    type: 'text',
    name: 'defaultLocale',
    message: `What is your default locale ${highlight('code')}?`,
    initial: defaultConfig?.defaultLocale ?? DEFAULT_LOCALE_CODE,
  }, {
    type: 'text',
    name: 'defaultLocaleName',
    message: `What is your default locale ${highlight('name')}?`,
    initial: DEFAULT_LOCALE_NAME,
  }])

  const extension = options.typescript ? 'ts' : 'js'
  const lastOption = await prompts([{
    type: 'text',
    name: 'resources',
    message: `In which folder will your resource files reside (e.g. 'en.json')?`,
    initial: 'yuzu',
  }])

  // The functions that should be matched during `build`
  const transformers = ['t', 'scopedT', 'yuzu', 'yz', 'i18n', '<Trans>',]

  const content = [
    '**/*.{tsx,ts,jsx,js}',
  ]

  // An example of a more specific content glob array.
  // const content = [
  //   'pages/**/*.{tsx,ts,jsx,js}',
  //   'app/**/*.{tsx,ts,jsx,js}',
  //   'components/**/*.{tsx,ts,jsx,js}',
  // ]

  const config = configSchema.parse({
    $schema: 'https://wwww.yuzujs.com/schema.json',
    defaultLocale: options.defaultLocale,
    locales: [{
      code: options.defaultLocale,
      name: options.defaultLocaleName,
    }],
    resources: lastOption.resources,
    content: content,
    transformers: transformers,
    framework: options.framework,
    tsx: options.typescript,
  })

  if (!skip) {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: `Write configuration to ${highlight(
        'yuzu.config.' + extension
      )}. Proceed?`,
      initial: true,
    })

    if (!proceed) {
      process.exit(0)
    }
  }

  // Write to file.
  logger.info('')
  const spinner = ora(`Writing yuzu.config.${extension}...`).start()
  const targetPath = path.resolve(cwd, `yuzu.config.${extension}`)
  await fs.writeFile(targetPath, templates.CONFIG(config, options.defaultLocaleName), 'utf8')
  spinner.succeed()

  if (options.framework === 'nextjs') {
    const { nextInternational  } = await prompts({
      type: 'confirm',
      name: 'nextInternational',
      message: `Installing next-international with npm. Proceed?`,
      initial: true,
    })

    if (nextInternational) {
      try {
        import('execa').then(async ({ execa }) => {
          const { stdout } = await execa('npm', ['install', '--save', 'next-international@latest']);
          console.log(stdout)
        })
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`Error: ${error.message}`);
        } else {
          console.error('An unknown error occurred during `npm install next-international@latest`.');
        }
      }
    }
  }

  const { openWeb } = await prompts({
    type: 'confirm',
    name: 'openWeb',
    message: `Open ${highlight('yuzujs.com/new')} to create a new project. Proceed?`,
    initial: true,
  })

  if (openWeb) {
    create()
  }

  return await resolveConfigPaths(cwd, config)
}