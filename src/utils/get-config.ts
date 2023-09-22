import { cosmiconfig } from "cosmiconfig"
import { loadConfig } from "tsconfig-paths"
import * as z from "zod"
export const DEFAULT_LOCALE_CODE = 'en'
export const DEFAULT_LOCALE_NAME = 'English'

// TODO: Figure out if we want to support all cosmiconfig formats.
// A simple components.json file would be nice.
const explorer = cosmiconfig('yuzu')

export const configSchema = z
  .object({
    $schema: z.string().optional(),
    defaultLocale: z.string(),
    locales: z.array(z.object({
      code: z.string(),
      name: z.string(),
    })),
    resources: z.string(),
    content: z.array(z.string()),
    transformers: z.array(z.string()),
    framework: z.enum(['nextjs', 'astro', 'svelte', 'other']),
    tsx: z.coerce.boolean().default(true),
  })
  .strict()

export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd)

  if (!config) {
    return null
  }

  return await resolveConfigPaths(cwd, config)
}

export async function resolveConfigPaths(cwd: string, config: Config) {

  // Read tsconfig.json.
  const tsConfig = await loadConfig(cwd)

  if (config.tsx && tsConfig.resultType === "failed") {
    throw new Error(
      `Failed to load tsconfig.json. ${tsConfig.message ?? ""}`.trim()
    )
  }

  return configSchema.parse({
    ...config,
  })
}

export async function getRawConfig(cwd: string): Promise<Config | null> {
  try {
    const configResult = await explorer.search(cwd)
    if (!configResult) {
      return null
    }
    return configSchema.parse(configResult.config)
  } catch (error) {
    throw new Error(`Invalid configuration found in ${cwd}/yuzu.config.(ts|js).`)
  }
}