import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { PasswordValidation } from '../auth-module/auth.constant';
import { ChangePasswordDtoDocs } from './change-password.docs';

export class ChangePasswordDto {
  @ApiProperty(ChangePasswordDtoDocs.OldPassword)
  @IsString()
  @Length(PasswordValidation.MinLength, PasswordValidation.MaxLength)
  public oldPassword: string;

  @ApiProperty(ChangePasswordDtoDocs.NewPassword)
  @IsString()
  @Length(PasswordValidation.MinLength, PasswordValidation.MaxLength)
  public newPassword: string;
}
