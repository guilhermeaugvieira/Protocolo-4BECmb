import {
  IUsuarioRepository,
  IUsuarioOut,
  IUsuarioAdicionarIn,
  IUsuarioAtualizarIn,
  IUsuarioAcessoIn,
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

  ler = async (): Promise<IUsuarioOut[]> => {
    let usuariosRegistrados: IUsuarioOut[] = [];
    let dadosQuery: IUsuarioOut;

    this.abrirConexao();

    await this.conexaoDB
      .query("SELECT * FROM usuario")
      .then((resultado) => {
        const respostaQuery = <RowDataPacket>resultado[0];

        if (respostaQuery.length >= 1) {
          for (let i = 0; i < respostaQuery.length; i++) {
            dadosQuery = {
              id: respostaQuery[i].UsuarioID,
              login: respostaQuery[i].UsuarioLogin,
              nome: respostaQuery[i].UsuarioNome,
              senha: respostaQuery[i].UsuarioSenha,
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

  lerPorId = async (usuarioId: string): Promise<IUsuarioOut> => {
    let usuarioEncontrado: IUsuarioOut = null;

    this.abrirConexao();

    await this.conexaoDB
      .query("SELECT * FROM usuario WHERE UsuarioID = ?", [usuarioId])
      .then((resultado) => {
        const respostaQuery = <RowDataPacket>resultado[0];

        if (respostaQuery.length === 1) {
          usuarioEncontrado = {
            id: respostaQuery[0].UsuarioID,
            login: respostaQuery[0].UsuarioLogin,
            nome: respostaQuery[0].UsuarioNome,
            senha: respostaQuery[0].UsuarioSenha,
          };
        }
      })
      .finally(() => {
        this.conexaoDB.end();
      });

    return usuarioEncontrado;
  };

  login = async (usuarioLogin: string): Promise<IUsuarioOut> => {
    let usuarioEncontrado: IUsuarioOut;

    this.abrirConexao();

    await this.conexaoDB
      .query(`SELECT * FROM usuario WHERE UsuarioLogin = '${usuarioLogin}'`)
      .then((resultado) => {
        const respostaQuery = <RowDataPacket>resultado[0];

        if (respostaQuery.length === 1) {
          usuarioEncontrado = {
            id: respostaQuery[0].UsuarioID,
            login: respostaQuery[0].UsuarioLogin,
            nome: respostaQuery[0].UsuarioNome,
            senha: respostaQuery[0].UsuarioSenha,
          };
        }
      })
      .finally(() => {
        this.conexaoDB.end();
      });

    return usuarioEncontrado;
  };
}
