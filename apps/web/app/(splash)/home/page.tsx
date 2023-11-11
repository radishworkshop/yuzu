import HomePage from './home-page'
import { currentUser } from '@clerk/nextjs';

export default async function Home() {
  const user = await currentUser();
  return (
    <HomePage user={user} />
  )
}