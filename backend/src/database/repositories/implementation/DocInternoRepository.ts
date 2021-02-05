import {
  IDocIn,
  IDocOut,
  IDocRepository,
  IDocFiltroDados,
  IDocFiltroQuantidade,
} from "../interfaces/IDocRepository";
import mysql2 from "mysql2";
import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class DocInternoRepository implements IDocRepository {
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

  ler = async (filtro: IDocFiltroDados): Promise<IDocOut[]> => {
    let documentosRegistrados: IDocOut[] = [];
    let dadosQuery: IDocOut;

    this.abrirConexao();

    let sqlQuery: string;
    let quantidadeFiltros = 0;

    sqlQuery = "SELECT * FROM doc_interno";

    if (filtro.ID !== undefined) {
      sqlQuery += ` WHERE InternoID = ${filtro.ID}`;
      quantidadeFiltros += 1;
    }

    if (filtro.Assunto !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoAssunto LIKE '%${filtro.Assunto}%'`;
    }

    if (filtro.Datadocumento !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoDatadocumento = '${filtro.Datadocumento}'`;
    }

    if (filtro.Datarecebimento !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoDatarecebimento = '${filtro.Datarecebimento}'`;
    }

    if (filtro.Destino1 !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoDestino1 LIKE '%${filtro.Destino1}%'`;
    }

    if (filtro.Destino2 !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoDestino2 LIKE '%${filtro.Destino2}%'`;
    }

    if (filtro.Destino3 !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoDestino3 LIKE '%${filtro.Destino3}%'`;
    }

    if (filtro.Nrprotocolo !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoNrprotocolo = '${filtro.Nrprotocolo}'`;
    }

    if (filtro.Procedencia !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoProcedencia LIKE '%${filtro.Procedencia}%'`;
    }

    if (filtro.especificacao !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` Internoespecificacao LIKE '%${filtro.especificacao}%'`;
    }
    if (filtro.Limit !== undefined) sqlQuery += ` LIMIT ${filtro.Limit}`;

    if (filtro.OffSet !== undefined) sqlQuery += ` OFFSET ${filtro.OffSet}`;

    await this.conexaoDB
      .query(sqlQuery)
      .then((resultado) => {
        const respostaQuery = <RowDataPacket>resultado[0];

        if (respostaQuery.length >= 1) {
          for (let i = 0; i < respostaQuery.length; i++) {
            dadosQuery = {
              id: respostaQuery[i].ExternoID,
              assunto: respostaQuery[i].ExternoAssunto,
              dataDocumento: respostaQuery[i].ExternoDataDocumento,
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
      .finally(() => {
        this.conexaoDB.end();
      });

    return documentosRegistrados;
  };

  lerQuantidade = async (filtro: IDocFiltroQuantidade): Promise<number> => {
    let documentosRegistrados: number;

    this.abrirConexao();

    let sqlQuery: string;
    let quantidadeFiltros = 0;

    sqlQuery = "SELECT COUNT(*) as quantDocumentos FROM doc_interno";

    if (filtro.ID !== undefined) {
      sqlQuery += ` WHERE InternoID = ${filtro.ID}`;
      quantidadeFiltros += 1;
    }

    if (filtro.Assunto !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoAssunto LIKE '%${filtro.Assunto}%'`;
    }

    if (filtro.Datadocumento !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoDatadocumento = '${filtro.Datadocumento}'`;
    }

    if (filtro.Datarecebimento !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoDatarecebimento = '${filtro.Datarecebimento}'`;
    }

    if (filtro.Destino1 !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoDestino1 LIKE '%${filtro.Destino1}%'`;
    }

    if (filtro.Destino2 !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoDestino2 LIKE '%${filtro.Destino2}%'`;
    }

    if (filtro.Destino3 !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoDestino3 LIKE '%${filtro.Destino3}%'`;
    }

    if (filtro.Nrprotocolo !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoNrprotocolo = '${filtro.Nrprotocolo}'`;
    }

    if (filtro.Procedencia !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoProcedencia LIKE '%${filtro.Procedencia}%'`;
    }

    if (filtro.especificacao !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` Internoespecificacao LIKE '%${filtro.especificacao}%'`;
    }

    await this.conexaoDB
      .query(sqlQuery)
      .then((resultado) => {
        const dados = <RowDataPacket>resultado[0];

        documentosRegistrados = dados[0].quantDocumentos;
      })
      .finally(() => {
        this.conexaoDB.end();
      });

    return documentosRegistrados;
  };

  adicionar = async (documentoRecebido: IDocIn): Promise<IDocOut> => {
    let documentoAdicionado: IDocOut;

    this.abrirConexao();

    await this.conexaoDB
      .query(
        "INSERT INTO doc_interno( \
      Internoespecificacao, \
      InternoDataDocumento, \
      InternoProcedencia, \
      InternoDatarecebimento, \
      InternoNrprotocolo, \
      InternoAssunto, \
      InternoDestino1, \
      InternoDestino2, \
      InternoDestino3) \
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
        const { insertId } = <ResultSetHeader>resultado[0];

        documentoAdicionado = {
          id: insertId,
          assunto: documentoRecebido.assunto,
          dataDocumento: documentoRecebido.dataDocumento,
          dataRecebimento: documentoRecebido.dataRecebimento,
          especificacao: documentoRecebido.especificacao,
          nrProtocolo: documentoRecebido.nrProtocolo,
          procedencia: documentoRecebido.procedencia,
          destino1: documentoRecebido.destino1,
          destino2: documentoRecebido.destino2,
          destino3: documentoRecebido.destino3,
        };
      })
      .finally(() => {
        this.conexaoDB.end();
      });

    return documentoAdicionado;
  };

  remover = async (documentoId: string): Promise<boolean> => {
    let documentoRemovido = false;

    this.abrirConexao();

    await this.conexaoDB
      .query("DELETE FROM doc_interno WHERE InternoID = ?", [documentoId])
      .then((resultado) => {
        const { affectedRows } = <ResultSetHeader>resultado[0];

        if (affectedRows === 1) documentoRemovido = true;
        else documentoRemovido = false;
      })
      .finally(() => {
        this.conexaoDB.end();
      });

    return documentoRemovido;
  };

  atualizar = async (documentoRecebido: IDocOut): Promise<boolean> => {
    let documentoAtualizado = false;

    this.abrirConexao();

    await this.conexaoDB
      .query(
        "UPDATE doc_interno SET \
      Internoespecificacao = ?, \
      InternoDataDocumento = ?, \
      InternoProcedencia = ?, \
      InternoDatarecebimento = ?, \
      InternoNrprotocolo = ?, \
      InternoAssunto = ?, \
      InternoDestino1 = ?, \
      InternoDestino2 = ?, \
      InternoDestino3 = ? \
      WHERE InternoID = ?",
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
        else documentoAtualizado = false;
      })
      .finally(() => {
        this.conexaoDB.end();
      });

    return documentoAtualizado;
  };
}
