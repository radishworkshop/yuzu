'use client'

import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Icons } from '../misc/icons'

export function NewProjectForm() {
  const [submitting, setSubmitting] = useState(false)
  const formSchema = z.object({
    projectName: z.string().trim().max(40, {
      message: 'Project name cannot be more than 40 characters.',
    }).refine((projectName) => {
      return /[a-zA-Z0-9]/.test(projectName)
    }, {
      message: 'Project name must have at least one number or letter.'
    }),
  })

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // baseLang: 'en',
    },
  })

  const router = useRouter()
  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true)
    axios.post('/api/new', {
      projectName: values.projectName,
      // baseLang: values.baseLang,
    }).then((response) => {
      if (!response.data.error) {
        router.push(`/${response.data.username}/${response.data.nameSlug}`)
      }
      else {
        setSubmitting(false)
        form.setError(response.data.field || 'projectName', {
          message: response.data.error,
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input placeholder="Project name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <Icons.spinner className="animate-spin h-4 w-4 mr-2" />
          ): (
            <Icons.power className="h-4 w-4 mr-2" />
          )}
          Create
        </Button>
      </form>
    </Form>
  )
}