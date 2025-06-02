export const CreateUserDtoDocs = {
  Email: {
    description: 'User unique address',
    example: 'user@user.ru'
  },

  Name: {
    description: 'User name',
    example: 'Keks',
  },

  AvatarId: {
    description: 'User avatar path',
    example: '/images/user.png',
    required: false,
  },

  Password: {
    description: 'Password',
    example: '123456',
  }
} as const;
