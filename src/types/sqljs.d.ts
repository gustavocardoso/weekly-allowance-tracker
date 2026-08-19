declare module 'sql.js' {
  export type BindValue = string | number | null | Uint8Array;
  export type BindParams = BindValue[] | Record<string, BindValue>;

  export interface QueryExecResult {
    columns: string[];
    values: Array<Array<string | number | null>>;
  }

  export interface Statement {
    bind(values?: BindParams): boolean;
    step(): boolean;
    getAsObject(params?: BindParams): Record<string, unknown>;
    free(): boolean;
  }

  export class Database {
    constructor(data?: Uint8Array | ArrayLike<number>);
    run(sql: string, params?: BindParams): Database;
    exec(sql: string, params?: BindParams): QueryExecResult[];
    prepare(sql: string, params?: BindParams): Statement;
    export(): Uint8Array;
    close(): void;
  }

  export interface SqlJsStatic {
    Database: typeof Database;
  }

  export interface SqlJsConfig {
    locateFile?: (file: string) => string;
  }

  export default function initSqlJs(config?: SqlJsConfig): Promise<SqlJsStatic>;
}
