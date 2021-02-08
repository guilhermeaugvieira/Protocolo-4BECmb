import {
  IUsuarioRepository,
  IUsuarioOut,
  IUsuarioAdicionarIn,
  IUsuarioAtualizarIn,
  IUsuarioFiltroDados,
  IUsuarioFiltroQuantidade,
} from "../interfaces/IUsuarioRepository";

import { ResultSetHeader, RowDataPacket } from "mysql2";
import { inject, injectable } from "tsyringe";
import { IDatabase } from "../../../providers/interfaces/IDatabase";

@injectable()
export class UsuarioRepository implements IUsuarioRepository {
  constructor(@inject("Database") private _Database: IDatabase) {}

  adicionar = async (
    usuarioRecebido: IUsuarioAdicionarIn
  ): Promise<boolean> => {
    let usuarioAdicionado = false;

    const con = this._Database.abrirConexao();

    await con
      .query(
        "INSERT INTO usuario(UsuarioNome, UsuarioLogin, UsuarioSenha) values (?, ?, ?)",
        [usuarioRecebido.nome, usuarioRecebido.login, usuarioRecebido.senha]
      )
      .then((resultado) => {
        const { affectedRows } = <ResultSetHeader>resultado[0];

        if (affectedRows === 1) usuarioAdicionado = true;
      })
      .catch((erro) => {
        console.log(erro);
      })
      .finally(() => {
        con.end();
      });

    return usuarioAdicionado;
  };

  remover = async (usuarioId: string): Promise<boolean> => {
    let usuarioRemovido = false;

    const con = this._Database.abrirConexao();

    await con
      .query("DELETE FROM usuario WHERE UsuarioID = ?", [usuarioId])
      .then((resultado) => {
        const { affectedRows } = <ResultSetHeader>resultado[0];

        if (affectedRows === 1) usuarioRemovido = true;
      })
      .catch((erro) => {
        console.log(erro);
      })
      .finally(() => {
        con.end();
      });

    return usuarioRemovido;
  };

  ler = async (filtro: IUsuarioFiltroDados): Promise<IUsuarioOut[]> => {
    let dadosQuery: IUsuarioOut;
    let contagemFiltros = 0;
    let usuariosRegistrados: IUsuarioOut[] = [];

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

    const con = this._Database.abrirConexao();

    await con
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
      .catch((erro) => {
        console.log(erro);
      })
      .finally(() => {
        con.end();
      });

    return usuariosRegistrados;
  };

  lerQuantidade = async (filtro: IUsuarioFiltroQuantidade): Promise<number> => {
    let contagemFiltros = 0;
    let usuariosRegistrados = 0;

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

    const con = this._Database.abrirConexao();

    await con
      .query(sqlQuery)
      .then((resultado) => {
        const dados = <RowDataPacket>resultado[0];

        usuariosRegistrados = dados[0].quantUsuarios;
      })
      .catch((erro) => {
        console.log(erro);
      })
      .finally(() => {
        con.end();
      });

    return usuariosRegistrados;
  };

  atualizar = async (
    usuarioRecebido: IUsuarioAtualizarIn
  ): Promise<boolean> => {
    let usuarioAtualizado = false;

    const con = this._Database.abrirConexao();

    await con
      .query(
        "UPDATE usuario SET UsuarioNome = ?, UsuarioSenha = ? where UsuarioID = ?",
        [usuarioRecebido.nome, usuarioRecebido.senha, usuarioRecebido.id]
      )
      .then((resultado) => {
        const { affectedRows } = <ResultSetHeader>resultado[0];

        if (affectedRows === 1) usuarioAtualizado = true;
      })
      .catch((erro) => {
        console.log(erro);
      })
      .finally(() => {
        con.end();
      });

    return usuarioAtualizado;
  };
}
