# MomoiAiriWebsite

自用的博客网站构建代码

## 依赖

react + vite + pnpm + ts + @mdx-js + remark

## 结构说明

```
MomoiAiriWebsite/
├── src/
│   ├── apps/
│   │   # 用于存放单独的页面应用，不走通用逻辑，构建单独去 vite 里配置。
│   │   └── StickerEditor/
│   │       ├── App.tsx
│   │       └── index.html
│   ├── components/
│   │   # ui 组件。
│   │   ├── Header/
│   │   │   ├── Header.module.css
│   │   │   └── Header.tsx
│   │   ├── Pages/
│   │   │   ├── Page.module.css
│   │   │   └── Page.tsx
│   │   └── Posts/
│   │       ├── Post.module.css
│   │       ├── Post.tsx
│   │       ├── PostList.module.css
│   │       └── PostList.tsx
│   ├── pages/
│   │   # 用于存放博客单独页面，页面渲染方式和逻辑都是共用的，但不会被记录文章分类、标签这种东西。
│   │   └── home.mdx
│   ├── posts/
│   │   # 博客文章页面，会自动处理编写时间、文章分类、标签这类字段。
│   │   ├── hello-world.mdx
│   │   └── index.ts
│   ├── types/
│   │   └── Post.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
└── package.json
```

## 接口

``` ts
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
