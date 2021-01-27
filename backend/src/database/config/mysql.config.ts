import mysql2 from "mysql2";

const conexaoDB = mysql2
  .createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "834159672",
    database: "protocolo",
  })
  .promise();

export { conexaoDB };
