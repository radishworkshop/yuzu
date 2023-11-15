import { Config, Helper } from '@/src/utils/get-config'
import { Locale } from '@/src/types/all'

export const CONFIG = (config: Config, helpers: Helper[]) => `${MODULE(config, `
  locales: [{
    code: '${config.locales[0].code}',
    name: '${config.locales[0].name}',
  }],
  framework: '${config.framework}',
  content: [
    ${config.content.map(t => `'${t}'`).join(',\n    ')}
  ],
  transformers: [${config.transformers.map(t => `'${t}'`).join(', ')}],
  resources: '${config.resources}',
  build: (locales: { code: string, name: string }[]) => ([${helpers.map(h => `{\n    path: '${h.path}',\n    template: '${h.template}'\n  }`).join(', ')}]), 
  typescript: ${config.typescript}
`)}`

export const MODULE = (config: Config, content: string) => `${config.typescript ? 'export default {' : 'module.exports = {'}${content}} ${config.typescript ? 'as const' : ';'}`

const NEXT_INTERNATIONAL_SERVER = (locales: Locale[]) => `import { createI18nServer } from 'next-international/server'

export const { getCurrentLocale, getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  ${locales.map(locale => `'${locale.code}': () => import('./${locale.code}.json')`).join(',\n  ')}
})`

const NEXT_INTERNATIONAL_CLIENT = (locales: Locale[]) => `'use client'

import { createI18nClient } from 'next-international/client'

export const { useCurrentLocale, useChangeLocale, useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
  ${locales.map(locale => `'${locale.code}': () => import('./${locale.code}.json')`).join(',\n  ')}
})`

const NEXT_INTERNATIONAL_PAGES = (locales: Locale[]) => `'use client'
import { createI18n } from 'next-international'

export const { useI18n, useScopedI18n, I18nProvider, getLocaleProps } = createI18n({
  ${locales.map(locale => `'${locale.code}': () => import('./${locale.code}.json')`).join(',\n  ')}
})`

export const BUILD_TEMPLATES = {
  NEXT_INTERNATIONAL_SERVER,
  NEXT_INTERNATIONAL_CLIENT,
  NEXT_INTERNATIONAL_PAGES,
}