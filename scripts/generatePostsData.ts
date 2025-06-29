import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import type { PostMeta } from '../src/types/Post.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, '../src/posts');
const outputFile = path.join(postsDir, 'index.ts');

const generatePostsIndex = () => {
  const files = fs.readdirSync(postsDir);
  const posts: PostMeta[] = [];

  files.forEach(file => {
    if (path.extname(file) !== '.mdx') return;
    
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    
    const slug = file.replace(/\.mdx$/, '');
    const meta: PostMeta = {
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      url: data.url || `/posts/${slug}`,
      tags: data.tags || [],
      category: data.category || 'Uncategorized',
    };
    
    posts.push(meta);
  });

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const content = `// Auto-generated file
import type { PostMeta } from '../types/Post';

export const posts: PostMeta[] = ${JSON.stringify(posts, null, 2)};

export const getPostBySlug = (slug: string) => {
  return posts.find(post => post.url === \`/posts/\${slug}\`);
};
`;

  fs.writeFileSync(outputFile, content);
};

generatePostsIndex();