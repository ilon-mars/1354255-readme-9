import { CommentRdo } from './comment.rdo';

export const BlogCommentWithPaginationRdoDocs = {
  Entities: {
    description: 'List of comments',
    example: ['Comment1', 'Comment2'],
    type: [CommentRdo],
  },

  TotalPages: {
    description: 'Total pages count',
    example: 10,
  },

  TotalItems: {
    description: 'Total items count',
    example: 50,
  },

  CurrentPage: {
    description: "Current page's number",
    example: 2,
  },

  ItemsPerPage: {
    description: 'Number of items per page',
    example: 20,
  }
} as const;
