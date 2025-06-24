import { ApiProperty } from '@nestjs/swagger';
import { PostT } from '@project/shared/core';
import {
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import {
  PostLinkValidation,
  PostQuoteValidation,
  PostTextValidation,
  PostVideoValidation,
  YOUTUBE_REGEXP,
} from '../blog-post.constant';
import {
  LinkContentDtoDocs,
  PhotoContentDtoDocs,
  QuoteContentDtoDocs,
  TextContentDtoDocs,
  VideoContentDtoDocs,
} from './post-content.docs';

export class PostContent {
  __type: PostT;
}

export class LinkContentDto extends PostContent {
  @ApiProperty(LinkContentDtoDocs.Url)
  @IsUrl()
  public url: string;

  @ApiProperty(LinkContentDtoDocs.Description)
  @IsOptional()
  @IsString()
  @MaxLength(PostLinkValidation.MaxLength)
  public description?: string;
}

export class PhotoContentDto extends PostContent {
  @ApiProperty(PhotoContentDtoDocs.PictureId)
  @IsMongoId()
  public pictureId: string;
}

export class QuoteContentDto extends PostContent {
  @ApiProperty(QuoteContentDtoDocs.Quote)
  @IsString()
  @Length(PostQuoteValidation.Quote.MinLength, PostQuoteValidation.Quote.MaxLength)
  public quote: string;

  @ApiProperty(QuoteContentDtoDocs.Author)
  @IsString()
  @Length(PostQuoteValidation.Author.MinLength, PostQuoteValidation.Author.MaxLength)
  public author: string;
}

export class TextContentDto extends PostContent {
  @ApiProperty(TextContentDtoDocs.Title)
  @IsString()
  @Length(PostTextValidation.Title.MinLength, PostTextValidation.Title.MaxLength)
  public title: string;

  @ApiProperty(TextContentDtoDocs.Teaser)
  @IsString()
  @Length(PostTextValidation.Teaser.MinLength, PostTextValidation.Teaser.MaxLength)
  public teaser: string;

  @ApiProperty(TextContentDtoDocs.Text)
  @IsString()
  @Length(PostTextValidation.Text.MinLength, PostTextValidation.Text.MaxLength)
  public text: string;
}

export class VideoContentDto extends PostContent {
  @ApiProperty(VideoContentDtoDocs.Title)
  @IsString()
  @Length(PostVideoValidation.MinLength, PostVideoValidation.MaxLength)
  public title: string;

  @ApiProperty(VideoContentDtoDocs.Url)
  @IsUrl()
  @Matches(YOUTUBE_REGEXP)
  public url: string;
}
