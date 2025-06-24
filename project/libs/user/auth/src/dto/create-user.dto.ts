import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsOptional, IsString, Length } from 'class-validator';
import {
  AuthValidationMessage,
  NameValidation,
  PasswordValidation,
} from './../auth-module/auth.constant';
import { CreateUserDtoDocs } from './create-user.docs';

export class CreateUserDto {
  @ApiProperty(CreateUserDtoDocs.Email)
  @IsEmail({}, { message: AuthValidationMessage.EmailNotValid })
  public email: string;

  @ApiProperty(CreateUserDtoDocs.Name)
  @IsString()
  @Length(NameValidation.MinLength, NameValidation.MaxLength)
  public name: string;

  @ApiProperty(CreateUserDtoDocs.AvatarId)
  @IsMongoId()
  @IsOptional()
  public avatar?: string;

  @ApiProperty(CreateUserDtoDocs.Password)
  @IsString()
  @Length(PasswordValidation.MinLength, PasswordValidation.MaxLength)
  password: string;
}
