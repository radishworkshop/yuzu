import { currentUser } from '@clerk/nextjs'
import { createProject } from '@/lib/xatarade'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const user = await currentUser()
  const { projectName } = await req.json() as { projectName: string }

  if (!user) {
    return NextResponse.json({ error: 'User must be signed in.' })
  }

  if (!projectName) {
    return NextResponse.json({ field: 'projectName', error: 'Project name is required.' })
  }

  if (projectName.length > 40) {
    return NextResponse.json({ field: 'projectName', error: 'Project name cannot be more than 40 characters.' })
  }

  try {
    const project = await createProject(user.id, projectName)
    if (!project) {
      throw new Error('Error creating project. Be sure to provide a Codesheets API key.')
    }
    return NextResponse.json({
      success: true,
      slug: project.slug,
    })
  }
  catch (e: any) {
    if (e.message) {
      return NextResponse.json({ field: 'projectName', error: e.message })
    } else {
      return NextResponse.json({ field: 'projectName', error: 'Unknown error creating project. Might be worth asking in Discord.' })
    }
  }
}