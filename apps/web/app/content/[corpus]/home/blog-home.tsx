import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { blogConfig, getBlogConfig } from '@/config/blog'
import Link from 'next/link'
import Image from 'next/image'

export default async function BlogHome() {
  const config = await getBlogConfig()
  return (
    <div className="mt-8 mx-auto max-w-[600px] flex flex-col gap-2">
      <h1 className="text-lg font-bold">Recent posts</h1>
      {config.map((post, index) => (
        <>
          {post.url && post.title && post.image && (
            <Link key={index} href={post.url}>
              <Card className="w-full overflow-hidden hover:bg-muted">
                <Image src={post.image} alt={post.title} width={1200} height={400} className="w-full h-64 object-cover" />
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )}
        </>
      ))}
    </div>
  )
}