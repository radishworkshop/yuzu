import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card'
import { NewProjectForm } from '@/components/forms/new-project'

export default async function New() {
  return (
    <Card className="mt-16 mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle>New project</CardTitle>
        <CardDescription>Choose a name to create your project.</CardDescription>
      </CardHeader>
      <CardContent>
        <NewProjectForm />
      </CardContent>
    </Card>
  )
}