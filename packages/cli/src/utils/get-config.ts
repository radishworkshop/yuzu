import { cosmiconfig } from "cosmiconfig"
import { TypeScriptLoader } from "cosmiconfig-typescript-loader";
import { loadConfig } from "tsconfig-paths"
import * as z from "zod"
export const DEFAULT_LOCALE_CODE = 'en'
export const DEFAULT_LOCALE_NAME = 'English'

const explorer = cosmiconfig('yuzu', {
  loaders: {
    '.ts': TypeScriptLoader(),
  }
})

export const configSchema = z
  .object({
    $schema: z.string().optional(),
    locales: z.array(z.object({
      code: z.string(),
      name: z.string(),
    })),
    resources: z.string(),
    content: z.array(z.string()),
    framework: z.enum(['nextjs', 'astro', 'svelte', 'other']),
    transformers: z.array(z.string()),
    helpers: z.array(z.object({
      path: z.string(),
      template: z.string().or(z.function()),
    })).optional(),
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

  const tsConfig = loadConfig(cwd)

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
    throw new Error(`Invalid configuration: ${error}`)
  }
}