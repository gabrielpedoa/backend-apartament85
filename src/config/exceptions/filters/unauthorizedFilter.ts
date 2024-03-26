import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { UnauthorizedException } from '../errors/unauthorized';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = 401;

    Logger.error(exception, UnauthorizedExceptionFilter.name);

    const errorObj = {
      code: status,
      type: exception.type,
      details: {message: exception.message},
    };
    response.status(status).json(errorObj);
  }
}
