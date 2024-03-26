import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { ValidationException } from '../errors/validation';
import { Request, Response } from 'express';

@Catch(ValidationException)
export class PayloadExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = 400;

    Logger.error(exception, PayloadExceptionFilter.name);

    const errorObj = {
      code: status,
      type: exception.type,
      details: {message: exception.message},
    };
    response.status(status).json(errorObj);
  }
}
