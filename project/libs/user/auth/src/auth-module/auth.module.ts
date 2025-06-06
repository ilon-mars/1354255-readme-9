import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { BlogUserModule } from '@project/blog-user';
import { NotificationsModule } from '@project/notifications';
import { getJwtOptions } from '@project/user-config';

import { RefreshTokenModule } from '../refresh-token-module/refresh-token.module';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';
import { LocalStrategy } from '../strategies/local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    NotificationsModule,
    RefreshTokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessStrategy, LocalStrategy, JwtRefreshStrategy]
})

export class AuthModule { }
