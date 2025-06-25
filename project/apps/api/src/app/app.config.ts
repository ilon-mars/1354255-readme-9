export enum ApplicationServiceURL {
  Users = 'http://localhost:3001/api/auth',
  Posts = 'http://localhost:3002/api/posts',
  Files = 'http://localhost:3004/api/files',
  Comments = 'http://localhost:3002/api/comments',
  FilesStatic = 'http://localhost:3004/static',
}

export enum HttpClientSettings {
  MaxRedirects = 5,
  Timeout = 3000,
}
