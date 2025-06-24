import { BlogPostRdo } from './blog-post.rdo';

export const BlogPostWithPaginationRdoDocs = {
  Entities: {
    description: 'List of posts',
    example: ['Post1', 'Post2'],
    type: [BlogPostRdo],
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
  },
} as const;
