import { PostItem, TransformedData } from '~/types/reddit';
import { updateData } from '~/utils/caching';

export const markPostAsRead = (
  data: TransformedData | undefined,
  postId: PostItem['id'],
): TransformedData | undefined => {
  if (!data) return undefined;

  const updated: TransformedData = {
    ...data,
    items: data.items.map((post) => (post.id !== postId ? post : { ...post, isRead: true, isNew: false })),
  };

  updateData(updated);

  return updated;
};
