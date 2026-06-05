export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function getErrorResponse(error: unknown): { statusCode: number; message: string } {
  if (error instanceof HttpError) {
    return { statusCode: error.statusCode, message: error.message };
  }

  if (error instanceof Error) {
    return { statusCode: 500, message: error.message };
  }

  return { statusCode: 500, message: 'Error interno del servidor' };
}
