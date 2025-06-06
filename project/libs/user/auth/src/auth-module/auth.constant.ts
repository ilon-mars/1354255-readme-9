export const AuthError = {
  UserExists: 'User with this email exists',
  UserNotFound: 'User not found',
  UserCredentialsWrong: 'User Password or Login is wrong',
} as const;

export const AuthResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  UserFound: 'User found',
  UserCreated: 'The new user has been successfully created.',
  GetNewToken: 'Get new access/refresh tokens'
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
