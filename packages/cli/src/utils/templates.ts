import { Config } from '@/src/utils/get-config'

export const CONFIG = (config: Config) => `${MODULE(config, `
  locales: [{
    code: '${config.locales[0].code}',
    name: '${config.locales[0].name}',
  }],
  resources: '${config.resources}',
  content: [\n    ${config.content.map(t => `'${t}'`).join(',\n    ')}\n  ],
  transformers: [${config.transformers.map(t => `'${t}'`).join(', ')}],
  framework: '${config.framework}',
  tsx: ${config.tsx},
`)}`

export const MODULE = (config: Config, content: string) => `${config.tsx ? 'export default {' : 'module.exports = {'}${content}} ${config.tsx ? 'as const' : ';'}`

export const CLIENT = (config: Config) => `'use client'

import { createI18nClient } from 'next-international/client'

export const { useCurrentLocale, useChangeLocale, useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
  ${config.locales.map(locale => `'${locale.code}': () => import('./${locale.code}.json')`).join(',\n  ')}
})`

export const SERVER = (config: Config) => `import { createI18nServer } from 'next-international/server'

export const { getCurrentLocale, getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  ${config.locales.map(locale => `'${locale.code}': () => import('./${locale.code}.json')`).join(',\n  ')}
})`