import { SortDirection, SortType } from '@project/shared/core';

export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_PAGE_COUNT = 1;

export const PostSort = {
  Direction: SortDirection.Desc,
  Type: SortType.CreatedAt,
} as const;

export const PostLinkValidation = {
  MaxLength: 300
} as const;

export const PostQuoteValidation = {
  Quote: {
    MinLength: 20,
    MaxLength: 300
  },
  Author: {
    MinLength: 3,
    MaxLength: 50
  },
} as const;

export const PostTextValidation = {
  Title: {
    MinLength: 20,
    MaxLength: 50
  },
  Teaser: {
    MinLength: 50,
    MaxLength: 255
  },
  Text: {
    MinLength: 100,
    MaxLength: 1024
  },
} as const;

export const PostVideoValidation = {
  MinLength: 20,
  MaxLength: 50,
} as const;

export const PostTagsValidation = {
  MinLength: 3,
  MaxLength: 10,
  MaxCount: 8
} as const;

export const YOUTUBE_REGEXP =
  /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi;

export const BlogPostResponseMessage = {
  PostCreated: 'The post was created',
  AuthFailed: 'Authentication failed',
  ServerError: 'Internal server error',
  PostFound: 'Post was found',
  PostNotFound: 'Post was not found',
  LikeAdded: 'Like was added',
  LikeDeleted: 'Like was deleted',
  PostDeleted: 'Post was deleted',
  Forbidden: 'Access denied',
  PostUpdated: 'Post was updated',
  ValidationError: 'Validation error',
  CommentCreated: 'Comment was created',
  CommentsFound: 'Comments were found',
  NotificationsSent: 'Notifications were sent',
} as const;
