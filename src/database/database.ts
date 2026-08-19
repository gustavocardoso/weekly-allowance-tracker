import initSqlJs from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

import { DatabaseError, MigrationError } from '@/database/errors';
import { CURRENT_SCHEMA_VERSION, migrations } from '@/database/schema';

type SqlJsStatic = Awaited<ReturnType<typeof initSqlJs>>;
type SqlJsDatabase = InstanceType<SqlJsStatic['Database']>;

const INDEXED_DB_NAME = 'weekly-allowance-tracker';
const INDEXED_DB_VERSION = 1;
const STORE_NAME = 'sqlite';
const DB_KEY = 'database';

class IndexedDbStorage {
  private async open(): Promise<IDBDatabase> {
    return await new Promise((resolve, reject) => {
      const request = window.indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
      request.onerror = () => reject(new DatabaseError('Failed to open IndexedDB storage.'));
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
    });
  }

  async load(): Promise<Uint8Array | null> {
    const db = await this.open();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(DB_KEY);
      request.onerror = () => reject(new DatabaseError('Failed to load database from IndexedDB.'));
      request.onsuccess = () => {
        const result = request.result;
        if (result instanceof Uint8Array) {
          resolve(result);
          return;
        }
        if (result instanceof ArrayBuffer) {
          resolve(new Uint8Array(result));
          return;
        }
        resolve(null);
      };
      tx.oncomplete = () => db.close();
      tx.onabort = () => reject(new DatabaseError('IndexedDB read transaction was aborted.'));
    });
  }

  async save(data: Uint8Array): Promise<void> {
    const db = await this.open();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(data, DB_KEY);
      request.onerror = () => reject(new DatabaseError('Failed to persist database to IndexedDB.'));
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onabort = () => reject(new DatabaseError('IndexedDB write transaction was aborted.'));
    });
  }
}

class DatabaseService {
  private sql: SqlJsStatic | null = null;
  private db: SqlJsDatabase | null = null;
  private initPromise: Promise<SqlJsDatabase> | null = null;
  private readonly storage = new IndexedDbStorage();

  /** Initialize sql.js, load persisted database, and run migrations. */
  async init(): Promise<SqlJsDatabase> {
    if (this.db) {
      return this.db;
    }

    if (this.initPromise) {
      return await this.initPromise;
    }

    this.initPromise = this.initializeInternal();
    try {
      this.db = await this.initPromise;
      return this.db;
    } catch (error) {
      console.error('Failed to initialize database.', error);
      throw error;
    } finally {
      this.initPromise = null;
    }
  }

  /** Get the initialized database instance. */
  getDB(): SqlJsDatabase {
    if (!this.db) {
      throw new DatabaseError('Database has not been initialized. Call init() first.');
    }
    return this.db;
  }

  /** Export the current database contents as a Uint8Array. */
  export(): Uint8Array {
    const db = this.getDB();
    return db.export();
  }

  /** Import database contents and persist them immediately. */
  async import(data: Uint8Array): Promise<SqlJsDatabase> {
    if (!(data instanceof Uint8Array) || data.length === 0) {
      throw new DatabaseError('Import data must be a non-empty Uint8Array.');
    }

    const sql = await this.getSqlModule();
    let db: SqlJsDatabase;

    try {
      db = new sql.Database(data);
      this.configureDatabase(db);
      this.runMigrations(db);
      this.assertIntegrity(db);
    } catch (error) {
      console.error('Failed to import database bytes.', error);
      throw new DatabaseError(error instanceof Error ? error.message : 'Failed to import database file.');
    }

    this.db?.close();
    this.db = db;
    await this.persist();
    return db;
  }

  async persist(): Promise<void> {
    if (!this.db) {
      return;
    }
    try {
      await this.storage.save(this.db.export());
    } catch (error) {
      console.error('Failed to persist database to IndexedDB.', error);
      throw error;
    }
  }

  private async initializeInternal(): Promise<SqlJsDatabase> {
    const sql = await this.getSqlModule();
    const persistedData = await this.storage.load();
    const db = persistedData ? new sql.Database(persistedData) : new sql.Database();
    this.configureDatabase(db);
    this.runMigrations(db);
    this.assertIntegrity(db);
    await this.storage.save(db.export());
    return db;
  }

  private async getSqlModule(): Promise<SqlJsStatic> {
    if (this.sql) {
      return this.sql;
    }

    this.sql = await initSqlJs({
      locateFile: () => wasmUrl,
    });

    return this.sql;
  }

  private configureDatabase(db: SqlJsDatabase): void {
    db.run('PRAGMA foreign_keys = ON;');
  }

  private assertIntegrity(db: SqlJsDatabase): void {
    const integrity = db.exec('PRAGMA integrity_check;');
    const result = integrity[0]?.values[0]?.[0];
    if (result !== 'ok') {
      throw new DatabaseError('Database integrity check failed.');
    }
  }

  private runMigrations(db: SqlJsDatabase): void {
    db.run('CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL);');

    const appliedVersions = new Set<number>();
    const result = db.exec('SELECT version FROM schema_migrations ORDER BY version ASC;');
    if (result[0]) {
      for (const row of result[0].values) {
        const version = row[0];
        if (typeof version === 'number') {
          appliedVersions.add(version);
        }
      }
    }

    for (const migration of migrations) {
      if (appliedVersions.has(migration.version)) {
        continue;
      }

      try {
        db.run('BEGIN;');
        db.run(migration.sql);
        db.run('INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?);', [migration.version, new Date().toISOString()]);
        db.run('COMMIT;');
      } catch (error) {
        try {
          db.run('ROLLBACK;');
        } catch {
          // ignore rollback failure
        }
        
        // Check if error is "duplicate column name" which can happen if baseSchema already has the column
        const errorMsg = error instanceof Error ? error.message : String(error);
        const isDuplicateColumn = errorMsg.includes('duplicate column name') || errorMsg.includes('already exists');
        
        if (isDuplicateColumn) {
          // Column already exists - mark migration as applied and continue
          console.warn(`Migration v${migration.version} skipped: column already exists`);
          try {
            db.run('INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?);', [migration.version, new Date().toISOString()]);
          } catch {
            // Ignore if already marked
          }
          continue;
        }
        
        console.error(`Failed to apply database migration v${migration.version}.`, error);
        throw new MigrationError(`Failed to apply database migration v${migration.version}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    const latestVersion = db.exec('SELECT MAX(version) AS version FROM schema_migrations;');
    const version = latestVersion[0]?.values[0]?.[0];
    if (typeof version !== 'number' || version !== CURRENT_SCHEMA_VERSION) {
      throw new MigrationError('Database schema version is out of sync after migrations.');
    }
  }
}

export const databaseService = new DatabaseService();
export type { SqlJsDatabase };
