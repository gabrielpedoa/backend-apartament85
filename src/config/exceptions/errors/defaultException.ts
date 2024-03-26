export class DefaultException extends Error {
  code: number;
  type: string;
  details: {};
  constructor(message: string, code: number) {
    super(message);
    this.type = this.constructor.name;
    this.code = code;
  }
}
