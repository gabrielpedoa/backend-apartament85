import { DefaultException } from './defaultException';

export class UnauthorizedException extends DefaultException {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}
