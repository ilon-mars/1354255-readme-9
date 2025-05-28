import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

import { AuthValidationMessage, PasswordValidation } from './../auth-module/auth.constant';

import { LoginUserDtoDocs } from './login-user.docs';

export class LoginUserDto {
  @ApiProperty(LoginUserDtoDocs.Email)
  @IsEmail({}, { message: AuthValidationMessage.EmailNotValid })
  public email: string;

  @ApiProperty(LoginUserDtoDocs.Password)
  @IsString()
  @Length(PasswordValidation.MinLength, PasswordValidation.MaxLength)
  public password: string;
}
