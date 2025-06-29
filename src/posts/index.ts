// Auto-generated file
import type { PostMeta } from '../types/Post';

export const posts: PostMeta[] = [
  {
    "title": "Hello World",
    "date": "2023-10-01",
    "url": "/hello-world",
    "tags": [
      "welcome",
      "intro"
    ],
    "category": "General"
  }
];

export const getPostBySlug = (slug: string) => {
  return posts.find(post => post.url === `/posts/${slug}`);
};
