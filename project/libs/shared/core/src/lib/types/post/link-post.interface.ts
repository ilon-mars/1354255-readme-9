import { BlogContents } from './blog-contents';
import { Post } from './post.interface';
import { PostType } from './post.type';

export interface LinkPost extends Post {
  content: BlogContents[typeof PostType.Link];
}
