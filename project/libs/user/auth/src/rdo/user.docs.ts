export const UserRdoDocs = {
  Id: {
    description: 'The uniq user ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
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
} as const;
