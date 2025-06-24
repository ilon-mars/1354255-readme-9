import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { PostT, PostType } from '@project/shared/core';
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
  Validate,
  ValidateNested,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PostTagsValidation } from '../blog-post.constant';
import { CreatePostDtoDocs } from './create-post.docs';
import {
  LinkContentDto,
  PhotoContentDto,
  PostContent,
  QuoteContentDto,
  TextContentDto,
  VideoContentDto,
} from './post-content.dto';

const ANY_LETTERS_REGEXP = /^\p{L}.*$/u;

@ValidatorConstraint({ name: 'startsWithLetter' })
export class StartsWithLetterValidator implements ValidatorConstraintInterface {
  validate(values: string[] = []): boolean {
    if (values.length) {
      return values.every((value) => ANY_LETTERS_REGEXP.test(value));
    }
    return false;
  }
}

@ApiExtraModels(LinkContentDto, PhotoContentDto, QuoteContentDto, TextContentDto, VideoContentDto)
export class CreatePostDto {
  @ApiProperty(CreatePostDtoDocs.Type)
  @IsIn(Object.values(PostType))
  public type: PostT;

  @ApiProperty(CreatePostDtoDocs.AuthorId)
  @IsString()
  @IsMongoId()
  public authorId: string;

  @ApiProperty(CreatePostDtoDocs.Tags)
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
  })
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
