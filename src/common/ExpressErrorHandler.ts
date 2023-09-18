import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';
import HttpStatusCode from './Enums/HttpStatusCode';
import { ErrorCodeEnum } from "./Enums";

/*
 //These error-handling middleware functions are attached to the app instance after the route handler functions have been defined.
*/
// Error handling Middleware function reads the error message
// and sends back a response in JSON format
export const errorHandler = (
  error: AppError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.header('Content-Type', 'application/json');
  let appError: AppError;

  if (error instanceof AppError) {
    appError = error as AppError;
  } else {
    appError = GetAppError(error);
  }
  const err = {
    message: appError.message,
    originalMessage: appError.originalMessage,
    type: error.type,
    errorCode: appError.errorCode,
    status: appError.statusCode,
  };
  response.status(appError.statusCode).send(err);
};

export enum ErrorTypeEnum {
  FunctionalException = 'FunctionalException',
  TecnicalException = 'TecnicalException',
}

/**
 *
 * @param error
 * @returns
 */
const GetAppError = (error: any): AppError => {
  let appError: AppError;

  // By default http status 500
  let statusCode = error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  if (appError?.statusCode) statusCode = appError.statusCode;

  if (!appError) {
    appError = new AppError(
      statusCode,
      ErrorCodeEnum.UNKNOWED,
      error.message,
      ErrorTypeEnum.TecnicalException
    );
  }

  if (error.response) {
    const responeDataMessage =
      error.response.data.message ||
      error.response.data.Message ||
      error.response.data.error.message;
    appError.message = appError.message.concat('\n', responeDataMessage);
  }

  return appError;
};
