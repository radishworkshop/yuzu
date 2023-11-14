// This file is helper methods for xata
import { getXataClient } from '@/db/xata'
const xata = getXataClient()
import randomString from 'crypto-random-string'
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
  const apiKey = 'yuzu_' + randomString({length: 32, type: 'alphanumeric'});
  const slug = randomSlug()
  const codesheetsApiKey = process.env.CODESHEETS_API_KEY

  if (codesheetsApiKey) {
    const codesheetsId = await createCodesheet({
      apiKey: codesheetsApiKey,
    }, {
      title: name,
      emoji: '🍋'
    })

    if (codesheetsId) {
      return await xata.db.projects.create({
        name, slug, apiKey, userId, codesheetsId
      })
    }
    else {
      console.log('Failed to create codesheet')
      return null
    }

  }
}

function randomSlug() {
  return randomString({ length: 24, characters: '0123456789abcdefghijklmnopqrstuvwxyz' })
}