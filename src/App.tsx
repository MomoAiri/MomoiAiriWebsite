import { Routes, Route } from 'react-router-dom'
import { BaseLayout } from './layouts/BaseLayout'
import HomePage from './pages/Home'
import PostPage from './pages/Post'
import PageNotFound from './pages/404'

function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:slug" element={<PostPage />} />
        <Route path="/pages/:slug" element={<PostPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BaseLayout>
  )
}

export default App