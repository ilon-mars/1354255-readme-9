export const UserRegisterDtoDocs = {
  Email: {
    description: 'User unique email',
    example: 'user@user.ru',
  },

  Name: {
    description: 'User name',
    example: 'Keks',
  },

  Avatar: {
    type: 'string',
    format: 'binary',
    description: 'User avatar',
    required: false,
  },

  Password: {
    description: 'User password',
    example: '123456',
  },
} as const;
