import {
  BlogContents,
  Entity,
  Post,
  PostT,
  StorableEntity,
} from '@project/shared/core';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public type: PostT;
  public authorId: string;
  public content: BlogContents[PostT];
  public published: boolean;
  public reposted: boolean;
  public originalId?: string;
  public originalAuthorId?: string;
  public tags: string[];
  public createdAt?: Date;
  public updatedAt?: Date;
  public likesCount: number;
  public commentsCount: number;

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.type = post.type;
    this.authorId = post.authorId;
    this.content = post.content;
    this.published = post.published;
    this.reposted = post.reposted;
    this.originalId = post.originalId;
    this.originalAuthorId = post.originalAuthorId;
    this.tags = post.tags;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.likesCount = post.likesCount;
    this.commentsCount = post.commentsCount;
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      type: this.type,
      authorId: this.authorId,
      content: this.content,
      published: this.published,
      reposted: this.reposted,
      originalId: this.originalId,
      originalAuthorId: this.originalAuthorId,
      tags: this.tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      likesCount: this.likesCount,
      commentsCount: this.commentsCount,
    };
  }
}
