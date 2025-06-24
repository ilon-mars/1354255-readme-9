import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BlogCommentWithPaginationRdoDocs } from './blog-comment-with-pagination.docs';
import { CommentRdo } from './comment.rdo';

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
