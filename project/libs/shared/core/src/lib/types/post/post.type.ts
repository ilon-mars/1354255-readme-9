export const PostType = {
  Text: 'TEXT',
  Link: 'LINK',
  Video: 'VIDEO',
  Quote: 'QUOTE',
  Photo: 'PHOTO',
} as const;

export type PostT = (typeof PostType)[keyof typeof PostType];
