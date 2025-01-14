import { Post } from 'src/components/Post';
import { PostItem } from 'src/types/reddit';

type RedditFeedProps = {
  items: PostItem[];
};

export const PostsList = ({ items }: RedditFeedProps) => {
  return (
    <>
      {items.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};
