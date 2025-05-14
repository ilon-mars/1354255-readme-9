import { Module } from '@nestjs/common';

import { BlogUserFactory } from './blog-user.factory';
import { BlogUserRepository } from './blog-user.repository';

@Module({
  controllers: [],
  providers: [BlogUserRepository, BlogUserFactory],
  exports: [BlogUserRepository],
})
export class BlogUserModule {}
