import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { BlogController } from './blog.controller';
import { CommentController } from './comment.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UsersController } from './users.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [UsersController, BlogController, CommentController],
  providers: [CheckAuthGuard],
})
export class AppModule {}
