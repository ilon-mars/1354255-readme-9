import 'multer';
import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthError,
  AuthResponseMessage,
  ChangePasswordDto,
  LoggedUserRdo,
  LoginUserDto,
  TokenPairRdo,
  UserDetailsRdo,
  UserRdo,
} from '@project/auth';
import { ApplicationServiceURL } from './app.config';
import { UserRegisterDto } from './dto/user-register.dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { substituteFileUrl } from './helpers/substitute-file-url';

@ApiTags('users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthError.UserCredentialsWrong,
  })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/login`,
      loginUserDto,
    );
    return data;
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
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/refresh`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      },
    );

    return data;
  }

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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('register')
  public async register(
    @Body() dto: UserRegisterDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    avatar?: Express.Multer.File,
  ) {
    if (avatar) {
      const formData = new FormData();

      formData.append(
        'file',
        new Blob([avatar.buffer], { type: avatar.mimetype }),
        avatar.originalname,
      );

      const { data } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Files}/upload`,
        formData,
      );

      dto.avatar = data.id;
    }

    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/register`,
      dto,
    );
    return data;
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
  @UseGuards(CheckAuthGuard)
  @Post('password')
  public async changePassword(@Body() dto: ChangePasswordDto, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/password`,
      dto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      },
    );

    return data;
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
  public async getUserDetails(@Param('id') id: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`, {
      headers: {
        Authorization: req.headers['authorization'],
      },
    });

    if (data?.['avatar']) {
      data['avatar'] = await substituteFileUrl(this.httpService, data?.['avatar']);
    }

    return data;
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
  @UseGuards(CheckAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('toggle-subscribe/:id')
  public async toggleSubscribe(@Param('id') id: string, @Req() req: Request) {
    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/toggle-subscribe/${id}`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      },
    );
  }
}
