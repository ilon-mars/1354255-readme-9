import { SortDirection } from '@project/shared/core';

export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;

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
