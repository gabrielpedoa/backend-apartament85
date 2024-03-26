import { DefaultException } from './defaultException';

export class NotFoundException extends DefaultException {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}
