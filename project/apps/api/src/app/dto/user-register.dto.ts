import { ApiProperty } from '@nestjs/swagger';
import { UserRegisterDtoDocs } from './user-register.docs';

export class UserRegisterDto {
  @ApiProperty(UserRegisterDtoDocs.Email)
  public email: string;

  @ApiProperty(UserRegisterDtoDocs.Name)
  public name: string;

  @ApiProperty(UserRegisterDtoDocs.Avatar)
  public avatar?: Express.Multer.File;

  @ApiProperty(UserRegisterDtoDocs.Password)
  public password: string;
}
