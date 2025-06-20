import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { CommentRdo } from './comment.rdo';
import { BlogCommentWithPaginationRdoDocs } from './blog-comment-with-pagination.docs';

export class BlogCommentWithPaginationRdo {
  @ApiProperty(BlogCommentWithPaginationRdoDocs.Entities)
  @Expose()
  @Type(() => CommentRdo)
  public entities: CommentRdo[];

  @ApiProperty(BlogCommentWithPaginationRdoDocs.TotalPages)
  @Expose()
  public totalPages: number;

  @ApiProperty(BlogCommentWithPaginationRdoDocs.TotalItems)
  @Expose()
  public totalItems: number;

  @ApiProperty(BlogCommentWithPaginationRdoDocs.CurrentPage)
  @Expose()
  public currentPage: number;

  @ApiProperty(BlogCommentWithPaginationRdoDocs.ItemsPerPage)
  @Expose()
  public itemsPerPage: number;
}
