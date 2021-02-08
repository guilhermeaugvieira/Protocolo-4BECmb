import { Pool } from "mysql2/promise";
import mysql2 from "mysql2";
import { IDatabase } from "../interfaces/IDatabase";

export class MySQL implements IDatabase {
  constructor() {}

  abrirConexao = (): Pool => {
    return mysql2
      .createPool({
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT),
      })
      .promise();
  };
}
