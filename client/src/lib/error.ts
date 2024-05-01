function createErrorFactory(name: string) {
  return class BusinessError extends Error {
    __proto__ = Error;

    constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, BusinessError.prototype);
      this.name = name;
    }
  };
}

export const APIError = class APIError extends createErrorFactory("APIError") {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
};
