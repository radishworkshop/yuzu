import { NextResponse } from 'next/server';
import { translate } from '@/lib/translators';
import { getApiKey, getDictionary, setDictionary } from '@/lib/utils';
import { getCodesheetsId } from '@/lib/xatarade';

export async function POST(req: Request) {
  const apiKey = getApiKey(req)
  if (!apiKey) {
    return NextResponse.json({
      error: 'No API key provided'
    })
  }
  const codesheetsId = await getCodesheetsId(apiKey)
  if (!codesheetsId) {
    return NextResponse.json({
      error: 'No Codesheet found'
    })
  }
  const rows = await getDictionary(codesheetsId, { apiKey })

  const locales = rows[0]
  // Skip the first row
  const translations = rows.slice(1)
  const messages = translations.map((row: string[]) => row[0])
  const base = locales[0]
  const targets = locales.slice(1)

  // for each locale, starting with the first translated
  for (let i = 0; i < targets.length; i++) {
    // get the messages that need translating
    const needs = messages.filter((message: string, rowIndex: number) => {
      // return the ones that don't have a value yet, but where the message does
      return message && !translations?.[rowIndex]?.[i + 1]
    })
    if (needs.length === 0) { continue }
    const translated = await translate(needs, base, targets[i])

    // if it was a success and we have the same number of responses as requests
    if (translated && needs.length === translated.length) {
      needs.forEach((message: string, index: number) => {
        const translationIndex = messages.indexOf(message)
        if (translationIndex >= 0) {
          // add 1 to skip the first column
          translations[translationIndex][i + 1] = translated[index]
        }
      })
    }
    else {
      console.error('Translation failed: (needs, translated) ', needs, translated, base, targets[i])
    }
  }

  await setDictionary(codesheetsId, [locales, ...translations], { apiKey })

  return NextResponse.json({
    success: true
  })
}