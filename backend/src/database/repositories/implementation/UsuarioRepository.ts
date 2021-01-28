import {
  IUsuarioRepository,
  IUsuarioOut,
  IUsuarioAdicionarIn,
  IUsuarioAtualizarIn,
  IUsuarioAcessoIn,
} from "../interfaces/IUsuarioRepository";

import { config } from "../../config/mysql.config";

import mysql2, { ResultSetHeader, RowDataPacket } from "mysql2";

export class UsuarioRepository implements IUsuarioRepository {
  conexaoDB;

  constructor() {
    this.conexaoDB = mysql2.createPool(config).promise();
  }

  adicionar = async (
    usuarioRecebido: IUsuarioAdicionarIn
  ): Promise<IUsuarioOut> => {
    let usuarioAdicionado: IUsuarioOut;

    await this.conexaoDB
      .query(
        "INSERT INTO usuario(UsuarioNome, UsuarioLogin, UsuarioSenha) values (?, ?, ?)",
        [usuarioRecebido.nome, usuarioRecebido.login, usuarioRecebido.senha]
      )
      .then((resultado) => {
        const { insertId } = <ResultSetHeader>resultado[0];

        usuarioAdicionado = {
          login: usuarioRecebido.login,
          nome: usuarioRecebido.nome,
          senha: usuarioRecebido.senha,
          id: insertId,
        };
      })
      .catch((erro) => {
        usuarioAdicionado = null;
      })
      .finally(() => {
        this.conexaoDB.end();
      });

    return usuarioAdicionado;
  };

  remover = async (usuarioId: string): Promise<boolean> => {
    let usuarioRemovido: boolean;

    await this.conexaoDB
      .query("DELETE FROM usuario WHERE UsuarioID = ?", [usuarioId])
      .then((resultado) => {
        const { affectedRows } = <ResultSetHeader>resultado[0];

        if (affectedRows === 1) usuarioRemovido = true;
        else usuarioRemovido = false;
      })
      .catch(() => {
        return (usuarioRemovido = false);
      })
      .finally(() => {
        this.conexaoDB.end();
      });

    return usuarioRemovido;
  };

  ler = async (): Promise<IUsuarioOut[]> => {
    let usuariosRegistrados: IUsuarioOut[] = [];
    let dadosQuery: IUsuarioOut;

    await this.conexaoDB.query("SELECT * FROM usuario").then((resultado) => {
      const respostaQuery = <RowDataPacket>resultado[0];

      for (let i = 0; i < respostaQuery.length; i++) {
        dadosQuery = {
          id: respostaQuery[i].UsuarioID,
          login: respostaQuery[i].UsuarioLogin,
          nome: respostaQuery[i].UsuarioNome,
          senha: respostaQuery[i].UsuarioSenha,
        };

        usuariosRegistrados.push(dadosQuery);
      }
    });

    return usuariosRegistrados;
  };

  atualizar = async (
    usuarioRecebido: IUsuarioAtualizarIn
  ): Promise<boolean> => {
    let usuarioAtualizado = false;

    await this.conexaoDB
      .query(
        "UPDATE usuario SET UsuarioNome = ?, UsuarioSenha = ? where UsuarioID = ?",
        [usuarioRecebido.nome, usuarioRecebido.senha, usuarioRecebido.id]
      )
      .then((resultado) => {
        const { affectedRows } = <ResultSetHeader>resultado[0];

        if (affectedRows >= 1) usuarioAtualizado = true;
        else usuarioAtualizado = false;
      })
      .catch(() => {
        usuarioAtualizado = false;
      });
    return usuarioAtualizado;
  };

  lerPorId = async (usuarioId: string): Promise<IUsuarioOut> => {
    let usuarioEncontrado: IUsuarioOut = null;

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
      });

    return usuarioEncontrado;
  };

  verificarAcesso = async (
    usuarioRecebido: IUsuarioAcessoIn
  ): Promise<IUsuarioOut> => {
    let dadosUsuario: IUsuarioOut = null;

    await this.conexaoDB
      .query(
        "SELECT * FROM usuario WHERE UsuarioLogin = ? and UsuarioSenha = ?",
        [usuarioRecebido.login, usuarioRecebido.senha]
      )
      .then((resultado) => {
        const respostaQuery = <RowDataPacket>resultado[0];

        if (respostaQuery.length === 1) {
          dadosUsuario = {
            id: respostaQuery[0].UsuarioID,
            login: respostaQuery[0].UsuarioLogin,
            nome: respostaQuery[0].UsuarioNome,
            senha: respostaQuery[0].UsuarioSenha,
          };
        }
      });

    return dadosUsuario;
  };
}
