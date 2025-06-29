export interface PostMeta {
	title: string
	date: string
	tags?: string[]
	category?: string
}

export interface Post {
	frontmatter: PostMeta
	content: React.ComponentType;
}
