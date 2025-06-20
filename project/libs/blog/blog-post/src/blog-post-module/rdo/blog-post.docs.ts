import { PostType } from '@project/shared/core';

import { BlogPostContentRdo } from './blog-post-content.rdo';

export const BlogPostRdoDocs = {
  Id: {
    description: 'The unique post ID',
    example: '27e5868e-8f05-4879-856d-77c70bd3ff8d',
  },

  Type: {
    description: `Post type: ${PostType.Video}, ${PostType.Text}, ${PostType.Quote}, ${PostType.Photo} or ${PostType.Link}`,
    example: 'VIDEO',
  },

  LikesCount: {
    description: 'Likes count',
    example: '10',
  },

  CommentsCount: {
    description: 'comments count',
    example: '15',
  },

  CreatedAt: {
    description: 'Date of creation',
    example: '2025-01-30T18:47:26',
  },

  AuthorId: {
    description: 'Author ID',
    example: '677e53ed7baca31a45997160',
  },

  Content: {
    type: BlogPostContentRdo,
    description: 'Post content',
    example: {
      title: 'Заголовок на 20+ символов',
      teaser:
        'Текст с анонсом публикации. Минимальная длина 50 символов, максимальная 255.',
      text: 'Текст публикации. Минимальная длина 100 символов, максимальная 1024 символа.',
    },
  },

  Tags: {
    description: 'Array of tags',
    example: ['cats', 'celebrities'],
    required: false,
  },

  Published: {
    description: 'Flag whether the post is published',
    example: true,
  },

  Reposted: {
    description: 'Flag whether the post is reposted',
    example: false,
  },

  OriginalId: {
    description: 'The id of the original post, if the post is reposted',
    example: '27e5868e-8f05-4879-856d-77c70bd3ff8d',
  },

  OriginalAuthorId: {
    description: 'The id of the original author, if the post is reposted',
    example: '677e53ed7baca31a45997160',
  }
} as const;
