import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Body,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';

import { BlogCommentService } from './blog-comment.service';
import { CommentRdo } from './rdo/comment.rdo';
import { AuthorIdDto } from './dto/author-id.dto';
import { BlogCommentResponseMessage } from './blog-comment.constant';

@Controller('comments')
export class BlogCommentController {
  constructor(private readonly blogCommentService: BlogCommentService) {}

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: BlogCommentResponseMessage.CommentFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogCommentResponseMessage.CommentNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogCommentResponseMessage.ServerError,
  })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const commentEntity = await this.blogCommentService.getComment(id);
    return fillDto(CommentRdo, commentEntity.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogCommentResponseMessage.CommentDeleted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogCommentResponseMessage.CommentNotFound,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: BlogCommentResponseMessage.Forbidden,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogCommentResponseMessage.ServerError,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('delete/:id')
  public async destroy(
    @Param('id') id: string,
    @Body() { authorId }: AuthorIdDto
  ) {
    await this.blogCommentService.deleteComment(id, authorId);
  }
}
