import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_PAGE_COUNT, MAX_COMMENT_LIMIT } from './blog-comment.constant';

export class BlogCommentQuery {
  @ApiProperty({
    description: 'Max items per page',
    required: false,
    default: MAX_COMMENT_LIMIT,
  })
  @Transform(({ value }) => +value || MAX_COMMENT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = MAX_COMMENT_LIMIT;

  @ApiProperty({
    description: 'Current page number',
    required: false,
    default: DEFAULT_PAGE_COUNT,
  })
  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsNumber()
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}
