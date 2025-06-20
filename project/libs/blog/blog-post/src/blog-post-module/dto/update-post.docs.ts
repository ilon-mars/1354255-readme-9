import { PostType } from '@project/shared/core';

export const UpdatePostDtoDocs = {
  Type: {
    description: `Post type: ${PostType.Video}, ${PostType.Text}, ${PostType.Quote}, ${PostType.Photo} or ${PostType.Link}`,
    example: 'VIDEO',
  },

  Tags: {
    description: 'Array of tags',
    example: ['cats', 'celebrities'],
    required: false,
  },

  AuthorId: {
    description: 'Author ID',
    example: '677e53ed7baca31a45997160',
  },

  Published: {
    description: 'Whether the post is published',
    example: true,
    required: false,
  }
} as const;
