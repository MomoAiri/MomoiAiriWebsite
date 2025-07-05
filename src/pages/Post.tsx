import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Post } from '@/types/Post'

async function getPost(slug: string, type: 'posts' | 'pages'): Promise<Post> {
  // 这里应该动态导入MDX文件
  // 以下是模拟实现
  let content: React.ComponentType
  let frontmatter: Post['frontmatter']

  if (type === 'posts') {
    // 动态导入文章
    const module = await import(`../posts/${slug}.mdx`)
    content = module.default
    frontmatter = module.frontmatter
  } else {
    // 动态导入页面
    const module = await import(`../pages/${slug}.mdx`)
    content = module.default
    frontmatter = module.frontmatter
  }

  return { content, frontmatter }
}

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/')
    const type = pathSegments[1] === 'posts' ? 'posts' : 'pages'

    if (!slug) {
      setError('Slug is missing')
      setLoading(false)
      return
    }

    getPost(slug, type)
      .then(setPost)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!post) return <div>Post not found</div>

  const { content: Content, frontmatter } = post

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
        <p className="text-gray-500 mt-2">{frontmatter.date}</p>
        {frontmatter.tags && (
          <div className="mt-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="prose max-w-none">
        <Content />
      </div>
    </article>
  )
}