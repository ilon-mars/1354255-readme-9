import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AuthorIdDtoDocs } from './author-id.docs';

export class AuthorIdDto {
  @ApiProperty(AuthorIdDtoDocs.AuthorId)
  @IsMongoId()
  authorId: string;
}
