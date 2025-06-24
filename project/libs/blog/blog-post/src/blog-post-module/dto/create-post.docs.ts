import { PostType } from '@project/shared/core';

export const CreatePostDtoDocs = {
  Type: {
    description: `Post type: ${PostType.Video}, ${PostType.Text}, ${PostType.Quote}, ${PostType.Photo} or ${PostType.Link}`,
    example: 'VIDEO',
  },

  AuthorId: {
    description: 'Author ID',
    example: '677e53ed7baca31a45997160',
  },

  Tags: {
    description: 'Array of tags',
    example: ['cats', 'celebrities'],
    required: false,
  },
} as const;
