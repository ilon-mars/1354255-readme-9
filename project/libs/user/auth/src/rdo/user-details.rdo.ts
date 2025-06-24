import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserDetailsRdoDocs } from './user-details.docs';

export class UserDetailsRdo {
  @ApiProperty(UserDetailsRdoDocs.Id)
  @Expose()
  public id: string;

  @ApiProperty(UserDetailsRdoDocs.Avatar)
  @Expose()
  public avatar: string;

  @ApiProperty(UserDetailsRdoDocs.Email)
  @Expose()
  public email: string;

  @ApiProperty(UserDetailsRdoDocs.Name)
  @Expose()
  public name: string;

  @ApiProperty(UserDetailsRdoDocs.SubscribersCount)
  @Expose()
  public subscribersCount: number;

  @ApiProperty(UserDetailsRdoDocs.PostsCount)
  @Expose()
  public postsCount: number;

  @ApiProperty(UserDetailsRdoDocs.CreatedAt)
  @Expose()
  public createdAt: string;
}
