import { PostMeta } from '../../types/Post';
import styles from './PostList.module.css';

interface PostListProps {
  posts: PostMeta[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className={styles.list}>
      {posts.map(post => (
        <div key={post.url} className={styles.item}>
          <h2><a href={post.url}>{post.title}</a></h2>
          <p className={styles.meta}>
            {post.date} • {post.category}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PostList;