import matter from 'gray-matter'
import fs from 'fs/promises'
import path from 'path'
import { Post, PostMeta } from '../types/Post'

const CONTENT_DIR = path.join(process.cwd(), 'public')

export async function getMdxFiles(dir: 'posts' | 'pages'): Promise<Post[]> {
  const baseDir = path.join(CONTENT_DIR, dir)
  const files = await fs.readdir(baseDir)
  
  const mdxFiles = await Promise.all(
    files.filter(file => file.endsWith('.mdx')).map(async file => {
      const filePath = path.join(baseDir, file)
      const source = await fs.readFile(filePath, 'utf8')
      const { data, content } = matter(source)
      
      // 验证必要的元数据字段
      if (!data.title || !data.date || !data.url) {
        throw new Error(`Missing required frontmatter fields in ${filePath}`)
      }
      
      return {
        frontmatter: {
          ...data,
          url: data.url.startsWith('/') ? data.url : `/${data.url}`
        } as PostMeta,
        content: content,
        filePath: `/public/${dir}/${file}`
      }
    })
  )
  
  // 按日期排序
  return mdxFiles.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

export async function generateContentMap() {
  const [posts, pages] = await Promise.all([
    getMdxFiles('posts'),
    getMdxFiles('pages')
  ])
  
  const contentMap = new Map<string, Post>()
  
  // 合并所有内容并创建 URL 到内容的映射
  ;[...posts, ...pages].forEach(post => {
    contentMap.set(post.frontmatter.url, post)
  })
  
  return contentMap
}