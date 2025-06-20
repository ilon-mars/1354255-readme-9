import { ApiProperty } from '@nestjs/swagger';
import { CommentCreateDtoDocs } from './comment-create.docs';

export class CommentCreateDto {
  @ApiProperty(CommentCreateDtoDocs.Text)
  public text: string;
}
