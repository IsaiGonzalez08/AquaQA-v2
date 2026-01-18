import { MissingCredentialsError, InvalidCredentialsError } from "../domain/authErrors";

export function mapAuthErrorToHttp(error: unknown) {
  if (error instanceof MissingCredentialsError) {
    return {
      status: 400,
      body: { error: { code: error.code } },
    };
  }

  if (error instanceof InvalidCredentialsError) {
    return {
      status: 401,
      body: { error: { code: error.code } },
    };
  }

  return {
    status: 500,
    body: { error: { code: "INTERNAL_SERVER_ERROR" } },
  };
}
