import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, Length } from 'class-validator';

import { CommentValidation } from './comment.constant';
import { CreateCommentDtoDocs } from './create-comment.docs';

export class CreateCommentDto {
  @ApiProperty(CreateCommentDtoDocs.Text)
  @IsString()
  @Length(CommentValidation.MinLength, CommentValidation.MaxLength)
  public text: string;

  @ApiProperty(CreateCommentDtoDocs.AuthorId)
  @IsMongoId()
  public authorId: string;
}
