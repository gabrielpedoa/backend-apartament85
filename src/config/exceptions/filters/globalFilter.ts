import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = 500;

    Logger.error(exception, GlobalExceptionFilter.name);

    const errorObj = {
      code: status,
      type: exception.type,
      details: {message: exception.message},
    };
    response.status(status).json(errorObj);
  }
}
