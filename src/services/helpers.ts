import type { BindParams, QueryExecResult } from 'sql.js';

import { databaseService } from '@/database/database';
import { DatabaseError, NotFoundError, ValidationError } from '@/database/errors';

export function sanitizeText(value: string, fieldName: string, maxLength = 255): string {
  const sanitized = value.trim().replace(/\s+/g, ' ');
  if (!sanitized) {
    throw new ValidationError(`${fieldName} is required.`);
  }
  if (sanitized.length > maxLength) {
    throw new ValidationError(`${fieldName} must be ${maxLength} characters or fewer.`);
  }
  return sanitized;
}

export function sanitizeOptionalText(value: string | null | undefined, fieldName: string, maxLength = 500): string | null {
  if (value == null) {
    return null;
  }
  const sanitized = value.trim().replace(/\s+/g, ' ');
  if (!sanitized) {
    return null;
  }
  if (sanitized.length > maxLength) {
    throw new ValidationError(`${fieldName} must be ${maxLength} characters or fewer.`);
  }
  return sanitized;
}

export function validateNonNegativeInteger(value: number, fieldName: string): number {
  if (!Number.isInteger(value) || value < 0) {
    throw new ValidationError(`${fieldName} must be a non-negative integer amount in cents.`);
  }
  return value;
}

export function validateIdentifier(value: number, fieldName: string): number {
  if (!Number.isInteger(value) || value <= 0) {
    throw new ValidationError(`${fieldName} must be a positive integer.`);
  }
  return value;
}

export function mapBoolean(value: unknown): boolean {
  return value === 1;
}

export function execute(sql: string, params?: BindParams): void {
  try {
    const db = databaseService.getDB();
    db.run(sql, params);
  } catch (error) {
    throw wrapDatabaseError(error);
  }
}

export function query(sql: string, params?: BindParams): QueryExecResult[] {
  try {
    const db = databaseService.getDB();
    return db.exec(sql, params);
  } catch (error) {
    throw wrapDatabaseError(error);
  }
}

export function getLastInsertRowId(): number {
  const result = query('SELECT last_insert_rowid() AS id;');
  const id = result[0]?.values[0]?.[0];
  if (typeof id !== 'number') {
    throw new DatabaseError('Failed to read last insert id.');
  }
  return id;
}

export function getSingleRow<T>(sql: string, params: BindParams | undefined, mapper: (row: Record<string, unknown>) => T): T | null {
  const db = databaseService.getDB();
  let statement;
  try {
    statement = db.prepare(sql, params);
    if (!statement.step()) {
      return null;
    }
    return mapper(statement.getAsObject());
  } catch (error) {
    throw wrapDatabaseError(error);
  } finally {
    statement?.free();
  }
}

export function getManyRows<T>(sql: string, params: BindParams | undefined, mapper: (row: Record<string, unknown>) => T): T[] {
  const db = databaseService.getDB();
  let statement;
  try {
    statement = db.prepare(sql, params);
    const rows: T[] = [];
    while (statement.step()) {
      rows.push(mapper(statement.getAsObject()));
    }
    return rows;
  } catch (error) {
    throw wrapDatabaseError(error);
  } finally {
    statement?.free();
  }
}

export function requireRow<T>(value: T | null, message: string): T {
  if (value === null) {
    throw new NotFoundError(message);
  }
  return value;
}

function wrapDatabaseError(error: unknown): Error {
  if (error instanceof Error) {
    if (error.name === 'ValidationError' || error.name === 'NotFoundError' || error.name === 'BusinessRuleError') {
      return error;
    }
    return new DatabaseError(error.message);
  }
  return new DatabaseError('Unknown database error.');
}
