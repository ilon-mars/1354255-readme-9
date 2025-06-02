import { Module } from '@nestjs/common';

import { BlogCommentModule } from '@project/blog-comment';
import { PrismaClientModule } from '@project/blog-models';

import { BlogPostController } from './blog-post.controller';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostService } from './blog-post.service';

@Module({
  imports: [BlogCommentModule, PrismaClientModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository, BlogPostFactory],
  exports: [BlogPostService],
})

export class BlogPostModule { }
