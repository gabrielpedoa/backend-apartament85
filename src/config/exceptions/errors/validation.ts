import { DefaultException } from './defaultException';

export class ValidationException extends DefaultException {
  constructor(message = 'Validation Error') {
    super(message, 400);
  }
}
