import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
  NotContains,
  ValidateNested,
} from 'class-validator';

import { PostType } from '@project/shared/core';

import { PostTagsValidation } from '../blog-post.constant';
import {
  LinkContentDto,
  PhotoContentDto,
  PostContent,
  QuoteContentDto,
  TextContentDto,
  VideoContentDto,
} from './post-content.dto';

export class CreatePostDto {
  @IsIn(Object.values(PostType))
  public type: (typeof PostType)[keyof typeof PostType];

  @IsString()
  @IsMongoId()
  public authorId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Length(PostTagsValidation.MinLength, PostTagsValidation.MaxLength, { each: true })
  @NotContains(' ', { each: true })
  @Transform(({ value }) => value.map((item) => item.toLowerCase()))
  @Transform(({ value }) => Array.from(new Set(value)))
  @ArrayMaxSize(PostTagsValidation.MaxCount)
  public tags: string[];

  @ValidateNested()
  @Type(() => PostContent, {
    discriminator: {
      property: '__type',
      subTypes: [
        { value: LinkContentDto, name: PostType.Link },
        { value: PhotoContentDto, name: PostType.Photo },
        { value: QuoteContentDto, name: PostType.Quote },
        { value: TextContentDto, name: PostType.Text },
        { value: VideoContentDto, name: PostType.Video },
      ],
    },
  })
  public content:
    | LinkContentDto
    | PhotoContentDto
    | QuoteContentDto
    | TextContentDto
    | VideoContentDto;
}
