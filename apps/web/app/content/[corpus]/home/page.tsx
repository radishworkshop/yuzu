
import { redirect } from 'next/navigation'
import { ContentPageProps } from '../[[...slug]]/page'
import BlogHome from './blog-home'

export default function ContentHome({ params }: ContentPageProps) {
  if (params.corpus === 'docs') {
    return redirect('/docs/welcome-to-the-yuzu-docs')
  }
  if (params.corpus === 'blog') {
    return <BlogHome />
  }
  if (params.corpus === 'resources') {
    return redirect('/')
  }
  else {
    return redirect('/')
  }
}