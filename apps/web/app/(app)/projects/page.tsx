import Link from 'next/link'
import { getAllProjects } from '@/lib/xatarade'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

export default async function Projects() {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
  }

  const projects = await getAllProjects(userId)
  return (
    <div className="max-w-6xl px-4 mx-auto py-16">
      <div className="mb-6 flex justify-end gap-6">
        <Link href='/new'>
          <Button>+ New project</Button>
        </Link>
      </div>
      {projects.length === 0 && (
        <Card className="p-6 h-60 cursor-pointer flex justify-center items-center">
          No projects yet.
        </Card>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Link key={index} href={`/projects/${project.slug}`}>
            <Card className="p-6 cursor-pointer hover:bg-accent">
              {project.name}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}