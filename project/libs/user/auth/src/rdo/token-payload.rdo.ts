import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { TokenPayloadRdoDocs } from './token-payload.docs';

export class TokenPayloadRdo {
  @ApiProperty(TokenPayloadRdoDocs.Sub)
  @Expose()
  sub: string;

  @ApiProperty(TokenPayloadRdoDocs.Email)
  @Expose()
  public email: string;

  @ApiProperty(TokenPayloadRdoDocs.Name)
  @Expose()
  public name: string;
}
