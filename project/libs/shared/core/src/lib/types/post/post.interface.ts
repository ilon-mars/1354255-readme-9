import { BlogContents } from './blog-contents';
import { PostT } from './post.type';

export interface Post {
  id?: string;
  type: PostT;
  authorId: string;
  published: boolean;
  reposted: boolean;
  originalId?: string;
  originalAuthorId?: string;
  tags: string[];
  content: BlogContents[PostT];
  createdAt?: Date;
  updatedAt?: Date;
  likesCount: number;
  commentsCount: number;
}
