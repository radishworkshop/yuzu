import React from 'react'
import { currentUser } from '@clerk/nextjs'
import HomePage from './(splash)/home/home-page'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await currentUser();
  if (user) {
    redirect('/projects')
  }
  else {
    return (
      <HomePage user={user} />
    )
  }
}