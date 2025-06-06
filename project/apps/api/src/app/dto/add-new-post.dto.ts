import {
  LinkContentDto,
  PhotoContentDto,
  QuoteContentDto,
  TextContentDto,
  VideoContentDto,
} from '@project/blog-post';
import { PostT } from '@project/shared/core';

export class AddNewPostDto {
  public type: PostT;

  public tags: string[];

  public content:
    | LinkContentDto
    | PhotoContentDto
    | QuoteContentDto
    | TextContentDto
    | VideoContentDto;
}
