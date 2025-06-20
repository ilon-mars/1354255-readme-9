import { PostType } from '@project/shared/core';

export const PostUpdateDtoDocs = {
  Type: {
    description: `Post type: ${PostType.Video}, ${PostType.Text}, ${PostType.Quote}, ${PostType.Photo} or ${PostType.Link}`,
    example: 'VIDEO',
  },

  Tags: {
    description: 'Array of tags',
    example: ['cats', 'celebrities'],
    required: false,
  },

  File: {
    type: 'string',
    format: 'binary',
    description: `File to upload. Used with ${PostType.Photo} type.`,
    required: false,
  },

  Published: {
    description: 'Whether the post is published',
    example: true,
    required: false,
  },
} as const;
