import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { PostT, PostType } from '@project/shared/core';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
  NotContains,
  Validate,
  ValidateNested,
} from 'class-validator';
import { PostTagsValidation } from '../blog-post.constant';
import { StartsWithLetterValidator } from './create-post.dto';
import {
  LinkContentDto,
  PhotoContentDto,
  PostContent,
  QuoteContentDto,
  TextContentDto,
  VideoContentDto,
} from './post-content.dto';
import { UpdatePostDtoDocs } from './update-post.docs';

@ApiExtraModels(LinkContentDto, PhotoContentDto, QuoteContentDto, TextContentDto, VideoContentDto)
export class UpdatePostDto {
  @ApiProperty(UpdatePostDtoDocs.Type)
  @IsIn(Object.values(PostType))
  public type: PostT;

  @ApiProperty(UpdatePostDtoDocs.Tags)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Length(PostTagsValidation.MinLength, PostTagsValidation.MaxLength, { each: true })
  @NotContains(' ', { each: true })
  @Transform(({ value }) => value.map((item) => item.toLowerCase()))
  @Transform(({ value }) => Array.from(new Set(value)))
  @ArrayMaxSize(PostTagsValidation.MaxCount)
  @Validate(StartsWithLetterValidator, {
    message: 'The first character of a tag must be a letter.',
  })
  public tags: string[];

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(LinkContentDto) },
      { $ref: getSchemaPath(PhotoContentDto) },
      { $ref: getSchemaPath(QuoteContentDto) },
      { $ref: getSchemaPath(TextContentDto) },
      { $ref: getSchemaPath(VideoContentDto) },
    ],
    required: false,
  })
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

  @ApiProperty(UpdatePostDtoDocs.AuthorId)
  @IsString()
  @IsMongoId()
  public authorId: string;

  @ApiProperty(UpdatePostDtoDocs.Published)
  @IsOptional()
  @IsBoolean()
  public published: boolean;
}
