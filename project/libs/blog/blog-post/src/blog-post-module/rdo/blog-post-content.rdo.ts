import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { BlogPostContentRdoDocs } from './blog-post-content.docs';

export class BlogPostContentRdo {
  @ApiProperty(BlogPostContentRdoDocs.Title)
  @Expose()
  public title: string;

  @ApiProperty(BlogPostContentRdoDocs.Url)
  @Expose()
  public url: string;

  @ApiProperty(BlogPostContentRdoDocs.PictureId)
  @Expose()
  public pictureId: string;

  @ApiProperty(BlogPostContentRdoDocs.Description)
  @Expose()
  public description: string;

  @ApiProperty(BlogPostContentRdoDocs.Quote)
  @Expose()
  public quote: string;

  @ApiProperty(BlogPostContentRdoDocs.Author)
  @Expose()
  public author: string;

  @ApiProperty(BlogPostContentRdoDocs.Teaser)
  @Expose()
  public teaser: string;

  @ApiProperty(BlogPostContentRdoDocs.Text)
  @Expose()
  public text: string;
}
