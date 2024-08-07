import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import { httpStatusCode } from '../constants/httpStatusCodes';
import { CustomError } from '../handlers';


@injectable()
export class ErrorHandler {
  public handleErrors(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    console.error('Custom Error Handler =>', {
      name: err.name,
      message: err.message,
      statusCode: err.statusCode,
      stack: err.stack
    });

    // Check if headers have already been sent
    if (res.headersSent) {
      console.log('Headers already sent, passing error to next handler.');
      return next(err); // Pass the error to the default Express error handler
    }

    if (err.code && err.code === 11000) {
      // Handle Mongoose duplication error
      const duplicateField = Object.keys(err.keyValue).join(', ');
      const message = `Duplicate field value entered for: ${duplicateField}. Please use another value!`;

      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        error: message,
        errorName: 'DuplicateFieldError',
        message: message
      });
    }

    if (err instanceof CustomError) {
        return res.status(err?.statusCode).json({
          message: err?.message,
          errorName: err?.name,
          stack: err?.stack,
        });
      }

    // Send the response
    return res.status(err.statusCode || httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      errorName: err.name,
      message: err.message
    });
  }
}
