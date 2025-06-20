export const AuthError = {
  UserExists: 'User with this email exists',
  UserNotFound: 'User not found',
  UserCredentialsWrong: 'User Password or Login is wrong',
  ServerError: 'Internal server error',
  PasswordChanged: 'Password was successfully changed.',
  PasswordChangeUnauthorized: 'Authentication failed or old password is wrong.',
  RefreshFailure: 'Wrong refresh token',
  JwtAuthFailed: 'JWT authentification failed',
} as const;

export const AuthResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  UserFound: 'User found',
  UserCreated: 'The new user has been successfully created.',
  RefreshSuccess: 'Get a new access/refresh tokens',
  SubscriptionSuccess: 'Successfully subscribed or unsubscribed',
  PostsCountSuccess: 'Posts count was successfully altered.',
} as const;

export const AuthValidationMessage = {
  EmailNotValid: 'The email is not valid',
} as const;

export const NameValidation = {
  MinLength: 3,
  MaxLength: 50
} as const;

export const PasswordValidation = {
  MinLength: 6,
  MaxLength: 12
} as const;
