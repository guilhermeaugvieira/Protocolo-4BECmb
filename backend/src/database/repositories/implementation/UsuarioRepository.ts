import {
  IUsuarioRepository,
  IUsuarioOut,
  IUsuarioAdicionarIn,
  IUsuarioAtualizarIn,
  IUsuarioFiltroDados,
  IUsuarioFiltroQuantidade,
} from "../interfaces/IUsuarioRepository";

import mysql2, { ResultSetHeader, RowDataPacket } from "mysql2";
import { Pool } from "mysql2/promise";

export class UsuarioRepository implements IUsuarioRepository {
  conexaoDB: Pool;

  constructor() {}

  abrirConexao = (): void => {
    this.conexaoDB = mysql2
      .createPool({
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT),
      })
      .promise();
  };

  adicionar = async (
    usuarioRecebido: IUsuarioAdicionarIn
  ): Promise<boolean> => {
    let usuarioAdicionado: boolean = false;

    this.abrirConexao();

    await this.conexaoDB
      .query(
        "INSERT INTO usuario(UsuarioNome, UsuarioLogin, UsuarioSenha) values (?, ?, ?)",
        [usuarioRecebido.nome, usuarioRecebido.login, usuarioRecebido.senha]
      )
      .then((resultado) => {
        const { affectedRows } = <ResultSetHeader>resultado[0];

        if (affectedRows === 1) usuarioAdicionado = true;
        else false;
      })
      .catch((erro) => {
        usuarioAdicionado = false;
        console.log(erro);
      })
      .finally(() => {
        this.conexaoDB.end();
      });

    return usuarioAdicionado;
  };

  remover = async (usuarioId: string): Promise<boolean> => {
    let usuarioRemovido: boolean = false;

    this.abrirConexao();

    await this.conexaoDB
      .query("DELETE FROM usuario WHERE UsuarioID = ?", [usuarioId])
      .then((resultado) => {
        const { affectedRows } = <ResultSetHeader>resultado[0];

        if (affectedRows === 1) usuarioRemovido = true;
        else usuarioRemovido = false;
      })
      .finally(() => {
        this.conexaoDB.end();
      });

    return usuarioRemovido;
  };

  ler = async (filtro: IUsuarioFiltroDados): Promise<IUsuarioOut[]> => {
    let dadosQuery: IUsuarioOut;
    let contagemFiltros = 0;
    let usuariosRegistrados: IUsuarioOut[] = [];

    this.abrirConexao();

    //Montagem da query
    let sqlQuery = "SELECT * FROM usuario"; //Abertura da query

    if (filtro.ID !== undefined) {
      //Verifica se é para filtrar o ID
      sqlQuery += ` WHERE UsuarioID = ${filtro.ID}`;
      contagemFiltros += 1;
    }

    if (filtro.Senha !== undefined) {
      //Verifica se é para filtra a Senha
      if (contagemFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` UsuarioSenha = '${filtro.Senha}'`;
      contagemFiltros += 1;
    }

    if (filtro.Login !== undefined) {
      //Verifica se é para filtrar o Login
      if (contagemFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` UsuarioLogin = '${filtro.Login}'`;
      contagemFiltros += 1;
    }

    if (filtro.Nome !== undefined) {
      //Verifica se é para filtrar o Nome
      if (contagemFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` UsuarioNome = '${filtro.Nome}'`;
      contagemFiltros += 1;
    }

    if (filtro.Limit !== undefined) sqlQuery += ` LIMIT ${filtro.Limit}`;

    if (filtro.OffSet !== undefined) sqlQuery += ` OFFSET ${filtro.OffSet}`;

    await this.conexaoDB
      .query(sqlQuery)
      .then((resultado) => {
        const registrosQuery = <RowDataPacket>resultado[0];

        if (registrosQuery.length >= 1) {
          for (let i = 0; i < registrosQuery.length; i++) {
            dadosQuery = {
              id: registrosQuery[i].UsuarioID,
              login: registrosQuery[i].UsuarioLogin,
              nome: registrosQuery[i].UsuarioNome,
              senha: registrosQuery[i].UsuarioSenha,
            };

            usuariosRegistrados.push(dadosQuery);
          }
        }
      })
      .finally(() => {
        this.conexaoDB.end();
      });

    return usuariosRegistrados;
  };

  lerQuantidade = async (filtro: IUsuarioFiltroQuantidade): Promise<number> => {
    let dadosQuery: IUsuarioOut;
    let contagemFiltros = 0;
    let usuariosRegistrados: number;

    this.abrirConexao();

    //Montagem da query
    let sqlQuery = "SELECT COUNT(*) as quantUsuarios FROM usuario"; //Abertura da query

    if (filtro.ID !== undefined) {
      //Verifica se é para filtrar o ID
      sqlQuery += ` WHERE UsuarioID = ${filtro.ID}`;
      contagemFiltros += 1;
    }

    if (filtro.Senha !== undefined) {
      //Verifica se é para filtra a Senha
      if (contagemFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` UsuarioSenha = '${filtro.Senha}'`;
      contagemFiltros += 1;
    }

    if (filtro.Login !== undefined) {
      //Verifica se é para filtrar o Login
      if (contagemFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` UsuarioLogin = '${filtro.Login}'`;
      contagemFiltros += 1;
    }

    if (filtro.Nome !== undefined) {
      //Verifica se é para filtrar o Nome
      if (contagemFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` UsuarioNome = '${filtro.Nome}'`;
      contagemFiltros += 1;
    }

    await this.conexaoDB
      .query(sqlQuery)
      .then((resultado) => {
        const dados = <RowDataPacket>resultado[0];

        usuariosRegistrados = dados[0].quantUsuarios;
      })
      .finally(() => {
        this.conexaoDB.end();
      });

    return usuariosRegistrados;
  };

  atualizar = async (
    usuarioRecebido: IUsuarioAtualizarIn
  ): Promise<boolean> => {
    let usuarioAtualizado = false;

    this.abrirConexao();

    await this.conexaoDB
      .query(
        "UPDATE usuario SET UsuarioNome = ?, UsuarioSenha = ? where UsuarioID = ?",
        [usuarioRecebido.nome, usuarioRecebido.senha, usuarioRecebido.id]
      )
      .then((resultado) => {
        const { affectedRows } = <ResultSetHeader>resultado[0];

        if (affectedRows === 1) usuarioAtualizado = true;
        else usuarioAtualizado = false;
      })
      .finally(() => {
        this.conexaoDB.end();
      });

    return usuarioAtualizado;
  };
}
