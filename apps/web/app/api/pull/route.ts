import { NextResponse } from 'next/server';
import { getApiKey, getDictionary } from '@/lib/utils';
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
  return NextResponse.json(rows)
}