import {
  IDocFiltroDados,
  IDocFiltroQuantidade,
  IDocIn,
  IDocOut,
  IDocRepository,
} from "../interfaces/IDocRepository";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { inject, injectable } from "tsyringe";
import { IDatabase } from "../../../providers/interfaces/IDatabase";

@injectable()
export class DocExternoRepository implements IDocRepository {
  constructor(@inject("Database") private _Database: IDatabase) {}

  ler = async (filtro: IDocFiltroDados): Promise<IDocOut[]> => {
    let documentosRegistrados: IDocOut[] = [];
    let dadosQuery: IDocOut;

    let sqlQuery: string;
    let quantidadeFiltros = 0;

    sqlQuery = "SELECT * FROM doc_externo";

    if (filtro.ID !== undefined) {
      sqlQuery += ` WHERE ExternoID = ${filtro.ID}`;
      quantidadeFiltros += 1;
    }

    if (filtro.Assunto !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` ExternoAssunto LIKE '%${filtro.Assunto}%'`;
    }

    if (filtro.Datadocumento !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` ExternoDatadocumento = '${filtro.Datadocumento}'`;
    }

    if (filtro.Datarecebimento !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` ExternoDatarecebimento = '${filtro.Datarecebimento}'`;
    }

    if (filtro.Destino !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` ExternoDestino1 LIKE '%${filtro.Destino}%' OR ExternoDestino2 LIKE '%${filtro.Destino}%' OR ExternoDestino3 LIKE '%${filtro.Destino}%'`;
    }

    if (filtro.Nrprotocolo !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` ExternoNrprotocolo = '${filtro.Nrprotocolo}'`;
    }

    if (filtro.Procedencia !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` ExternoProcedencia LIKE '%${filtro.Procedencia}%'`;
    }

    if (filtro.especificacao !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` Externoespecificacao LIKE '%${filtro.especificacao}%'`;
    }

    if (filtro.Limit !== undefined) sqlQuery += ` LIMIT ${filtro.Limit}`;

    if (filtro.OffSet !== undefined) sqlQuery += ` OFFSET ${filtro.OffSet}`;

    const con = this._Database.abrirConexao();

    await con
      .query(sqlQuery)
      .then((resultado) => {
        const respostaQuery = <RowDataPacket>resultado[0];

        if (respostaQuery.length >= 1) {
          for (let i = 0; i < respostaQuery.length; i++) {
            dadosQuery = {
              id: respostaQuery[i].ExternoID,
              assunto: respostaQuery[i].ExternoAssunto,
              dataDocumento: respostaQuery[i].ExternoDatadocumento,
              dataRecebimento: respostaQuery[i].ExternoDatarecebimento,
              especificacao: respostaQuery[i].Externoespecificacao,
              nrProtocolo: respostaQuery[i].ExternoNrprotocolo,
              procedencia: respostaQuery[i].ExternoProcedencia,
              destino1: respostaQuery[i].ExternoDestino1,
              destino2: respostaQuery[i].ExternoDestino2,
              destino3: respostaQuery[i].ExternoDestino3,
            };

            documentosRegistrados.push(dadosQuery);
          }
        }
      })
      .catch((erro) => {
        console.log(erro);
      })
      .finally(() => {
        con.end();
      });

    return documentosRegistrados;
  };

  lerQuantidade = async (filtro: IDocFiltroQuantidade): Promise<number> => {
    let documentosRegistrados = 0;

    let sqlQuery: string;
    let quantidadeFiltros = 0;

    sqlQuery = "SELECT COUNT(*) as quantDocumentos FROM doc_externo";

    if (filtro.ID !== undefined) {
      sqlQuery += ` WHERE ExternoID = ${filtro.ID}`;
      quantidadeFiltros += 1;
    }

    if (filtro.Assunto !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` ExternoAssunto LIKE '%${filtro.Assunto}%'`;
    }

    if (filtro.Datadocumento !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` ExternoDatadocumento = '${filtro.Datadocumento}'`;
    }

    if (filtro.Datarecebimento !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` ExternoDatarecebimento = '${filtro.Datarecebimento}'`;
    }

    if (filtro.Destino !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` ExternoDestino1 LIKE '%${filtro.Destino}%' OR ExternoDestino2 LIKE '%${filtro.Destino}%' OR ExternoDestino3 LIKE '%${filtro.Destino}%'`;
    }

    if (filtro.Nrprotocolo !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` ExternoNrprotocolo = '${filtro.Nrprotocolo}'`;
    }

    if (filtro.Procedencia !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` ExternoProcedencia LIKE '%${filtro.Procedencia}%'`;
    }

    if (filtro.especificacao !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` Externoespecificacao LIKE '%${filtro.especificacao}%'`;
    }

    const con = this._Database.abrirConexao();

    await con
      .query(sqlQuery)
      .then((resultado) => {
        const dados = <RowDataPacket>resultado[0];

        documentosRegistrados = dados[0].quantDocumentos;
      })
      .catch((erro) => {
        console.log(erro);
      })
      .finally(() => {
        con.end();
      });

    return documentosRegistrados;
  };

  adicionar = async (documentoRecebido: IDocIn): Promise<Boolean> => {
    let documentoAdicionado = false;

    const con = this._Database.abrirConexao();

    await con
      .query(
        "INSERT INTO doc_externo( \
      Externoespecificacao, \
      ExternoDatadocumento, \
      ExternoProcedencia, \
      ExternoDatarecebimento, \
      ExternoNrprotocolo, \
      ExternoAssunto, \
      ExternoDestino1, \
      ExternoDestino2, \
      ExternoDestino3) \
      values (?,?,?,?,?,?,?,?,?)",
        [
          documentoRecebido.especificacao,
          documentoRecebido.dataDocumento,
          documentoRecebido.procedencia,
          documentoRecebido.dataRecebimento,
          documentoRecebido.nrProtocolo,
          documentoRecebido.assunto,
          documentoRecebido.destino1,
          documentoRecebido.destino2,
          documentoRecebido.destino3,
        ]
      )
      .then((resultado) => {
        const { affectedRows } = <ResultSetHeader>resultado[0];

        if (affectedRows === 1) documentoAdicionado = true;
      })
      .catch((erro) => {
        console.log(erro);
      })
      .finally(() => {
        con.end();
      });

    return documentoAdicionado;
  };

  remover = async (documentoId: string): Promise<boolean> => {
    let documentoRemovido = false;

    const con = this._Database.abrirConexao();

    await con
      .query("DELETE FROM doc_externo WHERE ExternoID = ?", [documentoId])
      .then((resultado) => {
        const { affectedRows } = <ResultSetHeader>resultado[0];

        if (affectedRows === 1) documentoRemovido = true;
        else documentoRemovido = false;
      })
      .catch((erro) => {
        console.log(erro);
      })
      .finally(() => {
        con.end();
      });

    return documentoRemovido;
  };

  atualizar = async (documentoRecebido: IDocOut): Promise<boolean> => {
    let documentoAtualizado = false;

    const con = this._Database.abrirConexao();

    await con
      .query(
        "UPDATE doc_externo SET \
      Externoespecificacao = ?, \
      ExternoDatadocumento = ?, \
      ExternoProcedencia = ?, \
      ExternoDatarecebimento = ?, \
      ExternoNrprotocolo = ?, \
      ExternoAssunto = ?, \
      ExternoDestino1 = ?, \
      ExternoDestino2 = ?, \
      ExternoDestino3 = ? \
      WHERE ExternoID = ?",
        [
          documentoRecebido.especificacao,
          documentoRecebido.dataDocumento,
          documentoRecebido.procedencia,
          documentoRecebido.dataRecebimento,
          documentoRecebido.nrProtocolo,
          documentoRecebido.assunto,
          documentoRecebido.destino1,
          documentoRecebido.destino2,
          documentoRecebido.destino3,
          documentoRecebido.id,
        ]
      )
      .then((resultado) => {
        const { affectedRows } = <ResultSetHeader>resultado[0];

        if (affectedRows === 1) documentoAtualizado = true;
      })
      .catch((erro) => {
        console.log(erro);
      })
      .finally(() => {
        con.end();
      });

    return documentoAtualizado;
  };
}
