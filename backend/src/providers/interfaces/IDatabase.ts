import { Pool } from "mysql2/promise";

export interface IDatabase {
  abrirConexao(): Pool;
}
