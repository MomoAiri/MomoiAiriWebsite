import { Link } from 'react-router-dom'
import { PostMeta } from '@/types/Post'
import { useEffect, useState } from 'react'

async function getPosts(): Promise<PostMeta[]> {
  // 这里应该从文件系统或API获取文章列表
  // 以下是模拟数据
  return [
    {
      title: '我的第一篇文章',
      date: '2023-01-01',
      url: '/posts/first-post',
      tags: ['react', 'mdx'],
      category: '技术'
    },
    {
      title: '关于我',
      date: '2023-01-15',
      url: '/pages/about',
      category: '个人'
    }
  ]
}

export default function HomePage() {
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPosts()
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">最新内容</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.url}>
            <Link to={post.url} className="block hover:bg-gray-50 p-4 rounded">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-500">
                {post.date} · {post.category}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}