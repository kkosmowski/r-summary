import { TransformedData } from '~/types/reddit';

export const exampleSubreddit: TransformedData = {
  items: [
    {
      id: '1234',
      isNew: false,
      isRead: false,
      awards: [],
      authorName: 'example_author1',
      createdAt: new Date().getTime(),
      title: 'Example title of an example post',
      description: "<p>Some posts will contain a description, but other won't.</p>",
      subreddit: {
        name: 'example',
        prefixed: 'r/example',
      },
      score: {
        ups: 100,
        total: 4,
      },
      commentCount: 4,
      flair: {
        text: 'General Discussion',
        color: 'light',
        backgroundColor: '#00a6a5',
      },
      link: '',
      thumbnail: undefined,
      type: 'text',
      visited: false,
    },
    {
      id: '1235',
      isNew: false,
      isRead: false,
      awards: [],
      authorName: 'example_author2',
      createdAt: new Date().getTime(),
      title: 'Another example title',
      description: '',
      subreddit: {
        name: 'example',
        prefixed: 'r/example',
      },
      score: {
        ups: 100,
        total: 4,
      },
      commentCount: 4,
      flair: {
        text: 'General Discussion',
        color: 'light',
        backgroundColor: '#00a6a5',
      },
      link: 'https://www.reddit.com/r/react/comments/1ii3i0k/any_suggestions_on_what_is_based_network/',
      thumbnail: {
        url: 'data:image/jpeg;base64,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',
        width: 140,
        height: 73,
      },
      type: 'image',
      visited: false,
    },
  ],
  subreddit: { name: 'example', original: 'example', prefixed: 'r/example', url: '' },
};
