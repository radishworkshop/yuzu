import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getCodesheetPage, setCodesheetPage } from 'codesheets'

export function getApiKey(req: Request) {
  const auth = req.headers.get('Authorization')
  const apiKey = auth?.replace('Bearer ', '')
  return apiKey
}
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function getDictionary(id: string, opts: any) {
  return getCodesheetPage(id, 0, opts)
}

export function setDictionary(id: string, rows: string[][], opts: any) {
  return setCodesheetPage(id, 0, rows, opts)
}

export function validateEmail(email: string) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}