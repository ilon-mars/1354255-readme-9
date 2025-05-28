import {
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

import { PostT } from '@project/shared/core';

import {
  PostLinkValidation,
  PostQuoteValidation,
  PostTextValidation,
  PostVideoValidation,
  YOUTUBE_REGEXP
} from '../blog-post.constant';


export class PostContent {
  __type: PostT;
}

export class LinkContentDto extends PostContent {
  @IsUrl()
  public url: string;

  @IsOptional()
  @IsString()
  @MaxLength(PostLinkValidation.MaxLength)
  public description?: string;
}

export class PhotoContentDto extends PostContent {
  @IsUrl()
  public url: string;
}

export class QuoteContentDto extends PostContent {
  @IsString()
  @Length(PostQuoteValidation.Quote.MinLength, PostQuoteValidation.Quote.MaxLength)
  public quote: string;

  @IsString()
  @Length(PostQuoteValidation.Author.MinLength, PostQuoteValidation.Author.MaxLength)
  public author: string;
}

export class TextContentDto extends PostContent {
  @IsString()
  @Length(PostTextValidation.Title.MinLength, PostTextValidation.Title.MaxLength)
  public title: string;

  @IsString()
  @Length(PostTextValidation.Teaser.MinLength, PostTextValidation.Teaser.MaxLength)
  public teaser: string;

  @IsString()
  @Length(PostTextValidation.Text.MinLength, PostTextValidation.Text.MaxLength)
  public text: string;
}

export class VideoContentDto extends PostContent {
  @IsString()
  @Length(PostVideoValidation.MinLength, PostVideoValidation.MaxLength)
  public title: string;

  @IsUrl()
  @Matches(YOUTUBE_REGEXP)
  public url: string;
}
