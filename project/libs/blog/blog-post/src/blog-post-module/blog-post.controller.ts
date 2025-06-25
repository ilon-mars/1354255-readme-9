import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BlogCommentQuery,
  BlogCommentWithPaginationRdo,
  CommentRdo,
  CreateCommentDto,
} from '@project/blog-comment';
import { BlogNotificationsService } from '@project/blog-notifications';
import { fillDto } from '@project/shared/helpers';
import { BlogPostResponseMessage } from './blog-post.constant';
import { BlogPostQuery } from './blog-post.query';
import { BlogPostService } from './blog-post.service';
import { AuthorIdDto } from './dto/author-id.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostContentRequestTransform } from './interceptors/post-content-request-transform.interceptor';
import { BlogPostRdo } from './rdo/blog-post.rdo';
import { BlogPostWithPaginationRdo } from './rdo/blog-post-with-pagination.rdo';

@ApiTags('posts')
@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService,
    private readonly notificationsService: BlogNotificationsService,
  ) {}

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
    const posts = await this.blogPostService.getPojoPostsToNotify()

    await this.notificationsService.notifyNewPosts(posts);

    await this.blogPostService.makeNotifyRecord();
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
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const post = await this.blogPostService.getPost(id);
    return fillDto(BlogPostRdo, post.toPOJO());
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
    const postsWithPagination = await this.blogPostService.getPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    };
    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.CREATED,
    description: BlogPostResponseMessage.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BlogPostResponseMessage.ValidationError,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessage.AuthFailed,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessage.ServerError,
  })
  @Post('/')
  @UseInterceptors(PostContentRequestTransform)
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto);

    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostResponseMessage.PostDeleted,
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/delete/:postId')
  public async destroy(@Param('postId') postId: string, @Body() { authorId }: AuthorIdDto) {
    await this.blogPostService.deletePost(authorId, postId);
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
  @UseInterceptors(PostContentRequestTransform)
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(id, dto);
    return fillDto(BlogPostRdo, updatedPost.toPOJO());
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
  @Post('addLike/:postId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async saveLike(@Param('postId') postId: string, @Body() { authorId }: AuthorIdDto) {
    await this.blogPostService.addLike(authorId, postId);
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('deleteLike/:postId')
  public async deleteLike(@Param('postId') postId: string, @Body() { authorId }: AuthorIdDto) {
    await this.blogPostService.deleteLike(authorId, postId);
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.CREATED,
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
  @Post('repost/:postId')
  public async repost(@Param('postId') postId: string, @Body() { authorId }: AuthorIdDto) {
    const newPost = await this.blogPostService.createRepost(authorId, postId);
    return fillDto(BlogPostRdo, newPost);
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
  @Post('/:postId/comments')
  public async createComment(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.blogPostService.createComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
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
    const commentsWithPagination = await this.blogPostService.getComments(postId, query);

    const result = {
      ...commentsWithPagination,
      entities: commentsWithPagination.entities.map((comment) => comment.toPOJO()),
    };

    return fillDto(BlogCommentWithPaginationRdo, result);
  }
}
