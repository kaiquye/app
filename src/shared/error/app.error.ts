export class AppError extends Error {
  readonly message: string;
  readonly cause: unknown;

  constructor(errorMsg: string, cause: unknown = null) {
    super(errorMsg);
    this.name = 'AppError';
    this.cause = cause;
  }
}
