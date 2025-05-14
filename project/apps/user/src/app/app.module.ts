import { Module } from '@nestjs/common';
import { AuthModule } from '@project/auth';
import { BlogUserModule } from '@project/blog-user';

@Module({
  imports: [BlogUserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
