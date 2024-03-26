import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { NotFoundException } from '../errors/notFound';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = 404;

    Logger.error(exception, NotFoundExceptionFilter.name);
    console.log(exception)
    const errorObj = {
      code: status,
      type: exception.type,
      details: {message: exception.message},
    };

    response.status(status).json(errorObj);
  }
}
