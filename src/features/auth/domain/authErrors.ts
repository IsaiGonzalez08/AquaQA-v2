export abstract class AuthError extends Error {
  abstract code: string;
}

export class MissingCredentialsError extends AuthError {
  code = "AUTH_MISSING_CREDENTIALS";
}

export class InvalidCredentialsError extends AuthError {
  code = "AUTH_INVALID_CREDENTIALS";
}
