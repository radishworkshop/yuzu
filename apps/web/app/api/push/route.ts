import { NextResponse } from 'next/server'
import { getApiKey, getDictionary, setDictionary } from '@/lib/utils'
import { getCodesheetsId } from '@/lib/xatarade'

function rearrangeRow(locales: string[], oldLocales: string[], row: string[]) {
  // return in order of new locales
  return locales.map((locale: string) => {
    const oldIndex = oldLocales.indexOf(locale)
    if (oldIndex === -1) { return '' }
    else { return row[oldIndex] }
  })
}

interface PushData {
  locales: {
    code: string
    name: string
  }[]
  messages: string[]
  apiKey: string
}

export async function POST(req: Request) {
  const apiKey = getApiKey(req)
  const { locales, messages } = await req.json() as PushData
  if (!apiKey) {
    return NextResponse.json({
      error: 'No API key provided'
    })
  }

  const codesheetsId = await getCodesheetsId(apiKey)
  if (!codesheetsId) {
    return NextResponse.json({
      error: 'No Codesheet found'
    }, {
      status: 404,
      statusText: 'Not Found',
    })
  }
  const rows = await getDictionary(codesheetsId, { apiKey })
  const updatedRows = []
  const codes = locales.map((locale) => locale.code)
  // Set the first row to the new locales
  updatedRows.push(codes)

  const headers = rows[0] || codes
  const defaultIndex = headers.indexOf(locales[0].code)

  for (let i = 0; i < messages.length; i++) {
    if (rows.length < 2) {
      updatedRows.push([messages[i]])
    }
    else {
      for (let j = 1; j < rows.length; j++) {
        // Add that row if it was found
        if (defaultIndex !== -1 && rows[j][defaultIndex] === messages[i]) {
          updatedRows.push(rearrangeRow(codes, headers, rows[j]))
          break
        }

        // Add it if it wasn't found
        if (j === rows.length - 1) {
          updatedRows.push([messages[i]])
        }
      }
    }
  }

  await setDictionary(codesheetsId, updatedRows, { apiKey })

  return NextResponse.json({
    success: true
  })
}