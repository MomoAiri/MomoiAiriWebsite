# MomoiAiriWebsite

自用的博客网站构建代码

## 依赖

react + vite + pnpm + ts + @mdx-js + remark

## 使用流程

:root/posts 下面存放博客文章，使用 markdown 语法编写。
`pnpm run generate-posts` 生成 mdx 静态语法的文章列表。
`pnpm run dev` 启动开发环境。
`git push` 通过 github action 自动部署到 github pages。

## 接口

``` ts: src/types/Post.ts
export interface PostMeta {
	title: string
	date: string
	url: string
	tags?: string[]
	category?: string
}

export interface Post {
	frontmatter: PostMeta
	content: React.ComponentType;
}
```

## 结构说明

```
MomoiAiriWebsite/
├── public/
│   ├── apps/	# 一些单独 build 的页面应用。
│   ├── pages/	# mdx 文件，单一页面。
│   ├── posts/	# mdx 文件，文章页面。
├── src/
│   ├── generated/
│   ├── components/
│   ├── layouts/
│   ├── types/
│   │   └── Post.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
└── package.json
```

## 接口

``` ts: src/types/Post.ts
export interface PostMeta {
	title: string
	date: string
	url: string
	tags?: string[]
	category?: string
}

export interface Post {
	frontmatter: PostMeta
	content: React.ComponentType;
}
```

由于浏览器内无法从 markdown 的 yaml meta 中直接读数据，因此运行前通过脚本构造索引 post 数据的常量到 \src\posts\index.ts，用于路由或者生成文章列表。
