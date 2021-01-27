import {
  IUsuarioRepository,
  IUsuarioAdicionarOut,
  IUsuarioAdicionarIn,
} from "../interfaces/IUsuarioRepository";

import { conexaoDB } from "../../config/mysql.config";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class UsuarioRepository implements IUsuarioRepository {
  constructor() {}

  adicionar = async (
    usuarioRecebido: IUsuarioAdicionarIn
  ): Promise<IUsuarioAdicionarOut> => {
    let usuarioAdicionado: IUsuarioAdicionarOut;

    await conexaoDB
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
        console.log(erro);
        usuarioAdicionado = null;
      })
      .finally(() => {
        conexaoDB.end();
      });

    return usuarioAdicionado;
  };

  remover = async (usuarioId: string): Promise<boolean> => {
    let usuarioRemovido: boolean;

    await conexaoDB
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
        conexaoDB.end();
      });

    return usuarioRemovido;
  };
}
