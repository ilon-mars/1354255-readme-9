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
    description: 'User avatar id',
    example: '9de26ecfgyuierrkkffd67865f49e2',
    required: false,
  },

  Password: {
    description: 'Password',
    example: '123456',
  }
} as const;
