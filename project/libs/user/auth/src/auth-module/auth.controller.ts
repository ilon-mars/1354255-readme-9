import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoIdValidationPipe } from '@project/pipes';
import { fillDto } from '@project/shared/helpers';
import { NotificationsService } from '@project/user-notifications';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { UserDetailsRdo } from '../rdo/user-details.rdo';
import { TokenPairRdo } from '../refresh-token-module/rdo/token-pair.rdo';
import { AuthError, AuthResponseMessage } from './auth.constant';
import { AuthService } from './auth.service';
import { RequestWithTokenPayload } from './request-with-token-payload.interface';
import { RequestWithUser } from './request-with-user.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: AuthResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthError.UserExists,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: AuthError.ServerError,
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, name } = newUser;

    await this.notificationsService.registerSubscriber({ email, name });

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthError.UserCredentialsWrong,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);

    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @ApiResponse({
    type: UserDetailsRdo,
    status: HttpStatus.OK,
    description: AuthResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthError.UserNotFound,
  })
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);

    return fillDto(UserDetailsRdo, existUser.toPOJO());
  }

  @ApiResponse({
    type: TokenPairRdo,
    status: HttpStatus.OK,
    description: AuthResponseMessage.RefreshSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthError.RefreshFailure,
  })
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @ApiResponse({
    type: TokenPairRdo,
    status: HttpStatus.OK,
    description: AuthResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthError.JwtAuthFailed,
  })
  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: AuthError.PasswordChanged,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthError.PasswordChangeUnauthorized,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: AuthError.ServerError,
  })
  @UseGuards(JwtAuthGuard)
  @Post('password')
  public async changePassword(
    @Body() dto: ChangePasswordDto,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    const updatedUser = await this.authService.changePassword(payload.sub, dto);

    return fillDto(UserRdo, updatedUser.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: AuthResponseMessage.SubscriptionSuccess,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthError.UserNotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthError.JwtAuthFailed,
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('toggle-subscribe/:id')
  public async toggleSubscribe(
    @Param('id', MongoIdValidationPipe) id: string,
    @Req() { user }: RequestWithTokenPayload,
  ) {
    await this.authService.toggleSubscription(user.sub, id);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: AuthResponseMessage.PostsCountSuccess,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthError.UserNotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthError.JwtAuthFailed,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('incrementPostsCount/:id')
  public async incrementPostsCount(@Param('id', MongoIdValidationPipe) id: string) {
    await this.authService.incrementPostsCount(id);
  }
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: AuthResponseMessage.PostsCountSuccess,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthError.UserNotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthError.JwtAuthFailed,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('decrementPostsCount/:id')
  public async decrementPostsCount(@Param('id', MongoIdValidationPipe) id: string) {
    await this.authService.decrementPostsCount(id);
  }
}
