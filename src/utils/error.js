export const ErrorCode = Object.freeze({
  UNKNOWN: "UNKNOWN",
  CANCELED: "ERR_CANCELED",
  DOES_NOT_EXIST: "DOES_NOT_EXIST",
  PROJECT_NOT_FOUND: "PROJECT_NOT_FOUND_ERROR",
});

export const getErrorMessage = (error) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export class MWError extends Error {
  originalError;

  constructor(message, code, status, originalError) {
    super(message);

    this.name = "MWError";
    this.code = code;
    this.status = status;
    this.stack = originalError?.stack;
    this.originalError = originalError;
  }

  get isCanceled() {
    return this.code === ErrorCode.CANCELED;
  }

  get isNotFound() {
    return this.status === 404;
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isForbidden() {
    return this.status === 403;
  }

  get isBadRequest() {
    return this.status === 400;
  }

  get isInternalServerError() {
    return this.status === 500;
  }

  get isServiceUnavailable() {
    return this.status === 503;
  }

  get isGatewayTimeout() {
    return this.status === 504;
  }

  get isNetworkError() {
    return !this.status;
  }

  get isProjectNotFound() {
    return this.code === ErrorCode.PROJECT_NOT_FOUND;
  }

  get isDoesNotExist() {
    return this.code === ErrorCode.DOES_NOT_EXIST;
  }

  get isUnknown() {
    return (
      !this.isCanceled &&
      !this.isNotFound &&
      !this.isUnauthorized &&
      !this.isForbidden &&
      !this.isBadRequest &&
      !this.isInternalServerError &&
      !this.isServiceUnavailable &&
      !this.isGatewayTimeout &&
      !this.isNetworkError &&
      !this.isProjectNotFound &&
      !this.isDoesNotExist
    );
  }
}
