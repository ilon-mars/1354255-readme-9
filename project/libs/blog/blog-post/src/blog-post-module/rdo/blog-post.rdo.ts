import { ApiProperty } from '@nestjs/swagger';
import { PostT } from '@project/shared/core';
import { Expose, Type } from 'class-transformer';
import { BlogPostRdoDocs } from './blog-post.docs';
import { BlogPostContentRdo } from './blog-post-content.rdo';

export class BlogPostRdo {
  @ApiProperty(BlogPostRdoDocs.Id)
  @Expose()
  public id: string;

  @ApiProperty(BlogPostRdoDocs.Type)
  @Expose()
  public type: PostT;

  @ApiProperty(BlogPostRdoDocs.LikesCount)
  @Expose()
  public likesCount: number;

  @ApiProperty(BlogPostRdoDocs.CommentsCount)
  @Expose()
  public commentsCount: number;

  @ApiProperty(BlogPostRdoDocs.CreatedAt)
  @Expose()
  public createdAt: string;

  @ApiProperty(BlogPostRdoDocs.AuthorId)
  @Expose()
  public authorId: string;

  @ApiProperty(BlogPostRdoDocs.Content)
  @Expose()
  @Type(() => BlogPostContentRdo)
  public content: BlogPostContentRdo;

  @ApiProperty(BlogPostRdoDocs.Tags)
  @Expose()
  public tags: string[];

  @ApiProperty(BlogPostRdoDocs.Published)
  @Expose()
  public published: boolean;

  @ApiProperty(BlogPostRdoDocs.Reposted)
  @Expose()
  public reposted: boolean;

  @ApiProperty(BlogPostRdoDocs.OriginalId)
  @Expose()
  originalId: string;

  @ApiProperty(BlogPostRdoDocs.OriginalAuthorId)
  @Expose()
  originalAuthorId: string;
}
