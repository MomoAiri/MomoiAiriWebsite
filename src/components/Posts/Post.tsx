import { PostMeta } from '../../types/Post';
import styles from './Post.module.css';

interface PostProps {
  meta: PostMeta;
  content: React.ReactNode;
}

const Post = ({ meta, content }: PostProps) => {
  return (
    <article className={styles.post}>
      <h1>{meta.title}</h1>
      <div className={styles.meta}>
        <time>{meta.date}</time>
        {meta.tags && (
          <div className={styles.tags}>
            {meta.tags.map(tag => (
              <span key={tag} className={styles.tag}>#{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className={styles.content}>{content}</div>
    </article>
  );
};

export default Post;