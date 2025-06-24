export const MAX_COMMENT_LIMIT = 10;
export const DEFAULT_PAGE_COUNT = 1;

export const CommentError = {
  CommentsNotFound: 'Comments not found.',
} as const;

export const BlogCommentResponseMessage = {
  Forbidden: 'Access denied',
  ServerError: 'Internal server error',
  CommentDeleted: 'Comment was deleted',
  CommentFound: 'Comment was found',
  CommentNotFound: 'Comment was not found',
} as const;
