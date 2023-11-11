// This file is helper methods for xata
import { getXataClient } from '@/db/xata'
const xata = getXataClient()
import cryptoRandomString from 'crypto-random-string'
import { createCodesheet } from 'codesheets'

// map the yuzu project to a codesheet
export async function getCodesheetsId(apiKey: string) {
  const project = await xata.db.projects.select(['codesheetsId']).filter({
    apiKey
  }).getFirst()
  return project?.codesheetsId
}

export async function getAllProjects(userId: string) {
  const projects = await xata.db.projects.filter({
    userId: userId,
  }).getAll()
  return projects
}

export async function createProject(userId: string, name: string) {
  const apiKey = 'yuzu_' + cryptoRandomString({length: 32, type: 'alphanumeric'});

  const nameSlug = getSlugForName(name)
  await validateNameSlug(userId, nameSlug) // throws if nameSlug is taken

  const codesheetsApiKey = process.env.CODESHEETS_API_KEY

  if (codesheetsApiKey) {

    console.log(process.env.CODESHEETS_HOST)
    console.log(process.env.CODESHEETS_API_KEY)

    const codesheetsId = await createCodesheet({
      apiKey: codesheetsApiKey,
    }, {
      title: name,
      emoji: '🍋'
    })

    if (codesheetsId) {
      return await xata.db.projects.create({
        name, nameSlug, apiKey, userId, codesheetsId
      })
    }
    else {
      console.log('Failed to create codesheet')
      return null
    }

  }
}

async function validateNameSlug(userId: string, nameSlug: string) {
  const existingProject = await xata.db.projects.filter({
    userId: userId,
    nameSlug: nameSlug,
  }).getFirst()

  if (existingProject) {
    throw new Error(`This account already has a project under ${nameSlug}.`)
  }
}

function getSlugForName(name: string) {
  return name.toLowerCase().replace(/[\s-]+/g, '-').replace(/[^a-z0-9-]/g, '')
                           .replace(/^-+|-+$/g, '').replace(/-+/g, '-')
}