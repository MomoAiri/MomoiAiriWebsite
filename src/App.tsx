import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import PostList from './components/Posts/PostList'
import { posts } from './posts'
import Post from './components/Posts/Post'
import { lazy, Suspense } from 'react'

const BlogHome = () => {
  return (
    <div>
      <h2>Latest Posts</h2>
      <PostList posts={posts} />
    </div>
  )
}

const PostPage = () => {
  const location = useLocation()
  const slug = location.pathname.split('/').pop() || ''
  
  // 查找匹配的文章（支持 /posts/slug 和 /slug 两种格式）
  const postMeta = posts.find(p => 
    p.url === `/posts/${slug}` || p.url === `/${slug}`
  )
  
  if (!postMeta) return <div>Post not found</div>
  
  // 使用 Vite 的动态导入语法
  const Content = lazy(() => import(/* @vite-ignore */ `./posts/${slug}.mdx`))
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Post meta={postMeta} content={<Content />} />
    </Suspense>
  )
}

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<BlogHome />} />
        <Route path="/posts/:slug" element={<PostPage />} />
        <Route path="/:slug" element={<PostPage />} />
      </Routes>
    </div>
  )
}

export default App