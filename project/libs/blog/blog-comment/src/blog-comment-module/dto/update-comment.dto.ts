import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

import { CommentValidation } from './comment.constant';
import { UpdateCommentDtoDocs } from './update-comment.docs';

export class UpdateCommentDto {
  @ApiProperty(UpdateCommentDtoDocs.Text)
  @IsString()
  @Length(CommentValidation.MinLength, CommentValidation.MaxLength)
  public text: string;
}
