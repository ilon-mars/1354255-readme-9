import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { TokenPairRdoDocs } from './token-pair.docs';

export class TokenPairRdo {
  @ApiProperty(TokenPairRdoDocs.AccessToken)
  @Expose()
  public accessToken: string;

  @ApiProperty(TokenPairRdoDocs.RefreshToken)
  @Expose()
  public refreshToken: string;
}
