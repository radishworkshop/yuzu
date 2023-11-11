import { Badge } from '@/components/ui/badge'
import { CopyButton } from '@/components/content/copy-button'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getDictionary } from '@/lib/utils'
import { getXataClient } from '@/db/xata'
import { Icons } from '@/components/misc/icons'
const xata = getXataClient()

interface ProjectProps {
  params: {
    username: string
    project: string
  }
}

export default async function Project({ params }: ProjectProps) {
  const project = await xata.db.projects.select(['id', 'name', 'apiKey', 'codesheetsId']).filter({
    nameSlug: params.project,
  }).getFirst()

  if (project && project.codesheetsId) {

    const rows = await getDictionary(project.codesheetsId, {
      apiKey: process.env.CODESHEETS_API_KEY,
    })
    const locales = rows[0]

    return (
      <div className="p-4">
        <div className="max-w-4xl mx-auto mt-12">
          <h1 className="font-bold text-3xl my-6 mb-2">{project.name}</h1>
          <div>
            <Badge>API Key: {project.apiKey}</Badge>
            <CopyButton className="ml-2 flex-none" value={project.apiKey || ''} />
          </div>
          <Card className="mt-8">
            <CardContent className="flex justify-between items-center pt-6">
              <div>
                <CardTitle>Managing {rows.length} strings</CardTitle>
                <CardDescription className="mt-3">
                  {locales ? (
                    <>
                      Locales:
                      {locales.map((locale: string, i: number) => (
                        <code key={i} className="ml-1 text-yuzu text-sm py-0.5 px-1 border rounded-lg">
                          {locale}
                        </code>
                      ))}
                    </>
                  ): (
                    <>
                    No locales
                    </>
                  )}
                </CardDescription>
              </div>
              <Link target="_blank" href={`https://www.codesheets.com/s/${project.codesheetsId}`}>
                <Button>
                  Open in Codesheets
                  <Icons.externalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="text-center my-40">
        Error: did not find project
      </div>
    )
  }

}