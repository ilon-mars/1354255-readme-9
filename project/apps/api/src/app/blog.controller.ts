import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '@nestjs/swagger';
import { BlogCommentQuery, BlogCommentWithPaginationRdo, CommentRdo } from '@project/blog-comment';
import {
  BlogPostQuery,
  BlogPostRdo,
  BlogPostResponseMessage,
  BlogPostWithPaginationRdo,
} from '@project/blog-post';
import { InjectAuthorIdInterceptor } from '@project/interceptors';
import { Post as PostInterface, PostType } from '@project/shared/core';
import { ApplicationServiceURL } from './app.config';
import { CommentCreateDto } from './dto/comment-create.dto';
import { PostCreateDto } from './dto/post-create.dto';
import { PostUpdateDto } from './dto/post-update.dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { fillAuthorInfo } from './helpers/fill-author-info';
import { transformPost } from './helpers/transform-post';

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.CREATED,
    description: BlogPostResponseMessage.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessage.AuthFailed,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessage.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  public async create(
    @Body() dto: PostCreateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    if (dto.type === PostType.Photo) {
      if (file) {
        const formData = new FormData();
        formData.append(
          'file',
          new Blob([file.buffer], { type: file.mimetype }),
          file.originalname,
        );
        const { data } = await this.httpService.axiosRef.post(
          `${ApplicationServiceURL.Files}/upload`,
          formData,
        );
        dto.content = {
          pictureId: data.id,
        };
      } else {
        throw new BadRequestException(`With ${PostType.Photo} a "file" field is required.`);
      }
    }

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/`, dto);

    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/incrementPostsCount/${dto['authorId']}`,
    );

    return data;
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessage.ServerError,
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get<PostInterface>(
      `${ApplicationServiceURL.Posts}/${id}`,
    );
    return data;
  }

  @ApiResponse({
    type: BlogPostWithPaginationRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessage.ServerError,
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const { data } = await this.httpService.axiosRef.get<{
      entities: PostInterface[];
    }>(`${ApplicationServiceURL.Posts}`, {
      params: query,
    });

    for (const post of data.entities) {
      await transformPost(this.httpService, post);
    }

    return data;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostResponseMessage.LikeAdded,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessage.AuthFailed,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessage.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('addLike/:postId')
  public async saveLike(@Param('postId') postId: string, @Body() dto) {
    await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/addLike/${postId}`, dto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostResponseMessage.LikeDeleted,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessage.AuthFailed,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessage.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('deleteLike/:postId')
  public async deleteLike(@Param('postId') postId: string, @Body() dto) {
    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/deleteLike/${postId}`,
      dto,
    );
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.CREATED,
    description: BlogPostResponseMessage.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessage.AuthFailed,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessage.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @Post('repost/:postId')
  public async repost(@Param('postId') postId: string, @Body() dto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/repost/${postId}`,
      dto,
    );
    return data;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostResponseMessage.PostDeleted,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessage.AuthFailed,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: BlogPostResponseMessage.Forbidden,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessage.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:postId')
  public async destroy(@Param('postId') postId: string, @Body() dto) {
    await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/delete/${postId}`, dto);

    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/decrementPostsCount/${dto['authorId']}`,
    );
  }

  @ApiResponse({
    type: BlogPostRdo,
    description: BlogPostResponseMessage.PostUpdated,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BlogPostResponseMessage.ValidationError,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: BlogPostResponseMessage.Forbidden,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessage.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body() dto: PostUpdateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    if (dto.type === PostType.Photo) {
      const { data: existsPost } = await this.httpService.axiosRef.get(
        `${ApplicationServiceURL.Posts}/${id}`,
      );

      if (existsPost.type === PostType.Photo) {
        dto.content = existsPost.content;
      }

      if (file) {
        const formData = new FormData();

        formData.append(
          'file',
          new Blob([file.buffer], { type: file.mimetype }),
          file.originalname,
        );

        const { data } = await this.httpService.axiosRef.post(
          `${ApplicationServiceURL.Files}/upload`,
          formData,
        );

        dto.content = {
          pictureId: data.id,
        };
      } else if (existsPost.type !== PostType.Photo) {
        throw new BadRequestException(`With ${PostType.Photo} a "file" field is required.`);
      }
    }

    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Posts}/${id}`,
      dto,
    );

    return data;
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: BlogPostResponseMessage.CommentCreated,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessage.AuthFailed,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessage.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @Post('/:postId/comments')
  public async createComment(@Param('postId') postId: string, @Body() dto: CommentCreateDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/${postId}/comments`,
      dto,
    );
    return data;
  }

  @ApiResponse({
    type: BlogCommentWithPaginationRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.CommentsFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessage.AuthFailed,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessage.ServerError,
  })
  @Get('/:postId/comments')
  public async getComments(@Param('postId') postId: string, @Query() query: BlogCommentQuery) {
    const { data } = await this.httpService.axiosRef.get<{
      entities: Comment[];
    }>(`${ApplicationServiceURL.Posts}/${postId}/comments`, {
      params: query,
    });

    for (const comment of data.entities) {
      await fillAuthorInfo(this.httpService, comment);
    }

    return data;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostResponseMessage.NotificationsSent,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessage.ServerError,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('notify')
  public async notifyNewPosts() {
    await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}/notify`);
  }
}
