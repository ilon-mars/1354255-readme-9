import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BlogPostRdo } from './blog-post.rdo';
import { BlogPostWithPaginationRdoDocs } from './blog-post-with-pagination.docs';

export class BlogPostWithPaginationRdo {
  @ApiProperty(BlogPostWithPaginationRdoDocs.Entities)
  @Expose()
  @Type(() => BlogPostRdo)
  public entities: BlogPostRdo[];

  @ApiProperty(BlogPostWithPaginationRdoDocs.TotalPages)
  @Expose()
  public totalPages: number;

  @ApiProperty(BlogPostWithPaginationRdoDocs.TotalItems)
  @Expose()
  public totalItems: number;

  @ApiProperty(BlogPostWithPaginationRdoDocs.CurrentPage)
  @Expose()
  public currentPage: number;

  @ApiProperty(BlogPostWithPaginationRdoDocs.ItemsPerPage)
  @Expose()
  public itemsPerPage: number;
}
