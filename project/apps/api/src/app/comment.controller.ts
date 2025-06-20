import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BlogCommentResponseMessage } from '@project/blog-comment';
import { InjectAuthorIdInterceptor } from '@project/interceptors';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('comments')
@UseFilters(AxiosExceptionFilter)
export class CommentController {
  constructor(private readonly httpService: HttpService) {}

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
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @Delete(':id')
  public async destroy(@Param('id') id: string, @Body() dto) {
    await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comments}/delete/${id}`, dto);
  }
}
