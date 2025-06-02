import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  Length,
  NotContains,
  ValidateNested,
} from 'class-validator';

import { PostT, PostType } from '@project/shared/core';

import { PostTagsValidation } from '../blog-post.constant';
import {
  LinkContentDto,
  PhotoContentDto,
  PostContent,
  QuoteContentDto,
  TextContentDto,
  VideoContentDto,
} from './post-content.dto';

export class UpdatePostDto {
  @IsIn(Object.values(PostType))
  public type: PostT;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Length(PostTagsValidation.MinLength, PostTagsValidation.MaxLength, { each: true })
  @NotContains(' ', { each: true })
  @Transform(({ value }) => value.map((item) => item.toLowerCase()))
  @Transform(({ value }) => Array.from(new Set(value)))
  @ArrayMaxSize(PostTagsValidation.MaxCount)
  public tags: string[];

  @IsOptional()
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
