import { SourceLanguageCode, TargetLanguageCode, Translator } from 'deepl-node'
import { TranslationServiceClient } from '@google-cloud/translate'

const googleProjectId = process.env.GOOGLE_PROJECT_ID
const googleLocation = 'global'
let googlePrivateKey = ''
if (process.env.GOOGLE_SERVICE_PRIVATE_KEY) {
  googlePrivateKey = Buffer.from(process.env.GOOGLE_SERVICE_PRIVATE_KEY, 'base64').toString('binary')
}
const googleCredentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL || '',
  private_key: googlePrivateKey,
}

const deeplApiKey = process.env.DEEPL_API_KEY
const DEEPL = {
  sources: ['BG', 'CS', 'DA', 'DE', 'EL', 'EN', 'ES', 'ET', 'FI', 'FR', 'HU', 'ID', 'IT', 'JA', 'KO', 'LT', 'LV', 'NB', 'NL', 'PL', 'PT', 'RO', 'RU', 'SK', 'SL', 'SV', 'TR', 'UK', 'ZH'],
  targets: ['CS', 'DA', 'DE', 'EL', 'EN-GB', 'EN-US', 'ES', 'ET', 'FI', 'FR', 'HU', 'ID', 'IT', 'JA', 'KO', 'LT', 'LV', 'NB', 'NL', 'PL', 'PT-BR', 'PT-PT', 'RO', 'RU', 'SK', 'SL', 'SV', 'TR', 'UK', 'ZH'],
}
function isDeeplSourceLanguage(code: any): code is SourceLanguageCode {
  return DEEPL.sources.includes(code.toUpperCase());
}
function isDeeplTargetLanguage(code: any): code is TargetLanguageCode {
  return DEEPL.targets.includes(code.toUpperCase());
}

const GOOGLE = ['af', 'sq', 'am', 'ar', 'hy', 'as', 'ay', 'az', 'bm', 'eu', 'be', 'bn', 'bho', 'bs', 'bg', 'ca', 'ceb', 'zh-cn', 'zh-tw', 'co', 'hr', 'cs', 'da', 'dv', 'doi', 'nl', 'en', 'eo', 'et', 'ee', 'fil', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gn', 'gu', 'ht', 'ha', 'haw', 'he', 'hi', 'hmn', 'hu', 'is', 'ig', 'ilo', 'id', 'ga', 'it', 'ja', 'jv', 'kn', 'kk', 'km', 'rw', 'gom', 'ko', 'kri', 'ku', 'ckb', 'ky', 'lo', 'la', 'lv', 'ln', 'lt', 'lg', 'lb', 'mk', 'mai', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mni-mtei', 'lus', 'mn', 'my', 'ne', 'no', 'ny', 'or', 'om', 'ps', 'fa', 'pl', 'pt', 'pa', 'qu', 'ro', 'ru', 'sm', 'sa', 'gd', 'nso', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tl', 'tg', 'ta', 'tt', 'te', 'th', 'ti', 'ts', 'tr', 'tk', 'ak', 'uk', 'ur', 'ug', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu']

function isGoogleLanguage(code: string) {
  return GOOGLE.includes(code.toLowerCase());
}

const translateWithDeepl = async (messages: string[], sourceLang: SourceLanguageCode, targetLang: TargetLanguageCode) => {
  if (!deeplApiKey) { throw new Error('No deepl API key supplied') }
  const translator = new Translator(deeplApiKey)
  const translations =  await translator.translateText(messages, sourceLang, targetLang)
  return translations.map((translation) => translation.text)
}

const translateWithGoogle = async (messages: string[], sourceLang: string, targetLang: string) => {
  const translationClient = new TranslationServiceClient({ projectId: googleProjectId, credentials: googleCredentials })
  const request = {
    parent: `projects/${googleProjectId}/locations/${googleLocation}`,
    contents: messages,
    mimeType: 'text/plain', // mime types: text/plain, text/html
    sourceLanguageCode: sourceLang,
    targetLanguageCode: targetLang,
  };
  const [response] = await translationClient.translateText(request);
  if (response.translations) {
    return response.translations.map((translation) => translation.translatedText || '')
  }
  return null
}

export const translate = async (keyContent: string | string[], sourceLang: string, targetLang: string): Promise<string[] | null> => {
  const messages = typeof keyContent === 'string' ? [keyContent] : keyContent

  if (isDeeplSourceLanguage(sourceLang) && isDeeplTargetLanguage(targetLang)) {
    return await translateWithDeepl(messages, sourceLang, targetLang)
  }

  if (isGoogleLanguage(sourceLang) && isGoogleLanguage(targetLang)) {
    return await translateWithGoogle(messages, sourceLang, targetLang)
  }

  return null
}

