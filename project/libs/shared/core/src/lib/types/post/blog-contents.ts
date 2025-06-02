import { PostType } from './post.type';

export type BlogContents = {
  [PostType.Link]: {
    url: string;
    description?: string;
  };
  [PostType.Photo]: {
    url: string;
  };
  [PostType.Quote]: {
    quote: string;
    author: string;
  };
  [PostType.Text]: {
    title: string;
    teaser: string;
    text: string;
  };
  [PostType.Video]: {
    title: string;
    url: string;
  };
};
