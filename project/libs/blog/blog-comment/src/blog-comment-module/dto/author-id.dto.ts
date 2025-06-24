import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { AuthorIdDtoDocs } from './author-id.docs';

export class AuthorIdDto {
  @ApiProperty(AuthorIdDtoDocs.AuthorId)
  @IsMongoId()
  authorId: string;
}
