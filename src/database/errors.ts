export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class BusinessRuleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BusinessRuleError';
  }
}

export class MigrationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MigrationError';
  }
}
