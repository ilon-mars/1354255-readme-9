import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpClientSettings } from './app.config';
import { BlogController } from './blog.controller';
import { CommentController } from './comment.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UsersController } from './users.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HttpClientSettings.Timeout,
      maxRedirects: HttpClientSettings.MaxRedirects,
    }),
  ],
  controllers: [UsersController, BlogController, CommentController],
  providers: [CheckAuthGuard],
})
export class AppModule {}
