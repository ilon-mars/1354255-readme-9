import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  LinkContentDto,
  QuoteContentDto,
  TextContentDto,
  VideoContentDto,
} from '@project/blog-post';
import { PostT, PostType } from '@project/shared/core';
import { PostUpdateDtoDocs } from './post-update.docs';

@ApiExtraModels(LinkContentDto, QuoteContentDto, TextContentDto, VideoContentDto)
export class PostUpdateDto {
  @ApiProperty(PostUpdateDtoDocs.Type)
  public type: PostT;

  @ApiProperty(PostUpdateDtoDocs.Tags)
  public tags: string[];

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(LinkContentDto) },
      { $ref: getSchemaPath(QuoteContentDto) },
      { $ref: getSchemaPath(TextContentDto) },
      { $ref: getSchemaPath(VideoContentDto) },
    ],
    required: false,
    description: `Post content. With ${PostType.Photo} type is not required.`,
  })
  public content: LinkContentDto | QuoteContentDto | TextContentDto | VideoContentDto | object;

  @ApiProperty(PostUpdateDtoDocs.File)
  public file?: Express.Multer.File;

  @ApiProperty(PostUpdateDtoDocs.Published)
  public published: boolean;
}
