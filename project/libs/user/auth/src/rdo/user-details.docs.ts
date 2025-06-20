export const UserDetailsRdoDocs = {
  Id: {
    description: 'The unique user ID',
    example: '6329c3d6a04ab1061c6425ea',
  },

  Avatar: {
    description: 'User avatar path',
    example: '/images/user.png',
    required: false,
  },

  Email: {
    description: 'User email',
    example: 'user@user.local',
  },

  Name: {
    description: 'User name',
    example: 'Keks',
  },

  SubscribersCount: {
    description: 'Number of subscribers',
    example: 5,
  },

  PostsCount: {
    description: 'Number of posts',
    example: 6,
  },

  CreatedAt: {
    description: 'Registration date',
    example: '2025-01-28',
  }
} as const;
