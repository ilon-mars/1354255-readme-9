import { Module } from '@nestjs/common';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogConfigModule } from '@project/blog-config';
import { BlogPostModule } from '@project/blog-post';

@Module({
  imports: [BlogConfigModule, BlogPostModule, BlogCommentModule],
})
export class AppModule {}
