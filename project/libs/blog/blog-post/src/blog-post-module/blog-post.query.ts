import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PostT, PostType, SortDirection, SortType } from '@project/shared/core';

import {
  DEFAULT_PAGE_COUNT,
  DEFAULT_POST_COUNT_LIMIT,
  PostSort,
} from './blog-post.constant';

export class BlogPostQuery {
  @ApiProperty({
    description: 'Max items per page',
    required: false,
    default: DEFAULT_POST_COUNT_LIMIT,
  })
  @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @ApiProperty({
    description: `Sorting direction`,
    required: false,
    default: PostSort.Direction,
    enum: SortDirection,
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = PostSort.Direction;

  @ApiProperty({
    description: `Sorting type`,
    required: false,
    default: PostSort.Type,
    enum: SortType,
  })
  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortBy: SortType = PostSort.Type;

  @ApiProperty({
    description: 'Current page number',
    required: false,
    default: DEFAULT_PAGE_COUNT,
  })
  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsNumber()
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;

  @ApiProperty({
    description: 'Array of tags to search by',
    required: false,
  })
  @IsString({ each: true })
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsOptional()
  public tags?: string[];

  @ApiProperty({
    description: 'Type of posts to search by',
    required: false,
    enum: Object.values(PostType),
  })
  @IsIn(Object.values(PostType))
  @IsOptional()
  public type?: PostT;

  @ApiProperty({
    description: 'Text to search by in titles of posts',
    required: false,
  })
  @IsString()
  @IsOptional()
  public search?: string;

  @ApiProperty({
    description: 'If true - show drafts of current user',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  public drafts?: boolean;

  @ApiProperty({
    description: 'Id of author to search by',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  public authorId?: string;
}
