import { PostType } from '@project/shared/core';

import {
  PostLinkValidation,
  PostQuoteValidation,
  PostTextValidation,
  PostVideoValidation
} from '../blog-post.constant';

export const LinkContentDtoDocs = {
  Url: {
    description: `Post url. Used with ${PostType.Link} and ${PostType.Video} types. When used with ${PostType.Video} must be a valid youtube link`,
    example: 'localhost/keks.jpg',
  },

  Description: {
    description: `Post description. Used with ${PostType.Link} (optional). Max ${PostLinkValidation.MaxLength} characters.`,
    example: 'Описание максимум 300 символов',
    required: false,
  }
} as const;

export const PhotoContentDtoDocs = {
  PictureId: {
    description: `Mongo id of uploaded picture.`,
    example: 'localhost/keks.jpg',
  }
} as const;


export const QuoteContentDtoDocs = {
  Quote: {
    description: `Post quote. Used with ${PostType.Quote}. ${PostQuoteValidation.Quote.MinLength}-${PostQuoteValidation.Quote.MaxLength} characters.`,
    example: 'Текст цитаты от 20 до 300 символов',
  },

  Author: {
    description: `Post quote author. Used with ${PostType.Quote}. ${PostQuoteValidation.Author.MinLength}-${PostQuoteValidation.Author.MaxLength} characters.`,
    example: 'Автор цитаты, от 3 до 50 символов',
  }
} as const;

export const TextContentDtoDocs = {
  Title: {
    description: `Post title. Used with ${PostType.Text} and ${PostType.Video} types. ${PostTextValidation.Title.MinLength}-${PostTextValidation.Title.MaxLength} symbols.`,
    example: 'Заголовок на 20+ символов',
  },

  Teaser: {
    description: `Post teaser. Used with ${PostType.Text}. ${PostTextValidation.Teaser.MinLength}-${PostTextValidation.Teaser.MaxLength} characters.`,
    example: 'Текст с анонсом публикации, от 50 до 255 символов',
  },

  Text: {
    description: `Post main text. Used with ${PostType.Text}. ${PostTextValidation.Text.MinLength}-${PostTextValidation.Text.MaxLength} characters.`,
    example: 'Основной текст публикации, от 100 до 1024 символов',
  }
} as const;

export const VideoContentDtoDocs = {
  Title: {
    description: `Post title. Used with ${PostType.Text} and ${PostType.Video} types. ${PostVideoValidation.MinLength}-${PostVideoValidation.MaxLength} symbols.`,
    example: 'Заголовок более 20 символов',
  },

  Url: {
    description: `Post url. Used with ${PostType.Link} and ${PostType.Video} types. When used with ${PostType.Video} must be a valid youtube link`,
    example: 'localhost/keks.jpg',
  }
} as const;
