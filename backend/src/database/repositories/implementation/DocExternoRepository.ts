import {
  IDocFiltro,
  IDocIn,
  IDocOut,
  IDocRepository,
} from "../interfaces/IDocRepository";
import mysql2 from "mysql2";
import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class DocExternoRepository implements IDocRepository {
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

  ler = async (): Promise<IDocOut[]> => {
    let documentosRegistrados: IDocOut[] = null;
    let dadosQuery: IDocOut;

    this.abrirConexao();

    await this.conexaoDB
      .query("SELECT * FROM doc_externo")
      .then((resultado) => {
        const respostaQuery = <RowDataPacket>resultado[0];

        if (respostaQuery.length >= 1) {
          documentosRegistrados = [];

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

  lerPorId = async (documentoId: string): Promise<IDocOut> => {
    let documentoEncontrado: IDocOut = null;

    this.abrirConexao();

    await this.conexaoDB
      .query("SELECT * FROM doc_externo WHERE ExternoID = ?", [documentoId])
      .then((resultado) => {
        const respostaQuery = <RowDataPacket>resultado[0];

        if (respostaQuery.length === 1) {
          documentoEncontrado = {
            id: respostaQuery[0].ExternoID,
            assunto: respostaQuery[0].ExternoAssunto,
            dataDocumento: respostaQuery[0].ExternoDataDocumento,
            dataRecebimento: respostaQuery[0].ExternoDatarecebimento,
            especificacao: respostaQuery[0].Externoespecificacao,
            nrProtocolo: respostaQuery[0].ExternoNrprotocolo,
            procedencia: respostaQuery[0].ExternoProcedencia,
            destino1: respostaQuery[0].ExternoDestino1,
            destino2: respostaQuery[0].ExternoDestino2,
            destino3: respostaQuery[0].ExternoDestino3,
          };
        }
      })
      .finally(() => {
        this.conexaoDB.end();
      });

    return documentoEncontrado;
  };

  adicionar = async (documentoRecebido: IDocIn): Promise<IDocOut> => {
    let documentoAdicionado: IDocOut;

    this.abrirConexao();

    await this.conexaoDB
      .query(
        "INSERT INTO doc_externo( \
      Externoespecificacao, \
      ExternoDataDocumento, \
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
      .query("DELETE FROM doc_externo WHERE ExternoID = ?", [documentoId])
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
        "UPDATE doc_externo SET \
      Externoespecificacao = ?, \
      ExternoDataDocumento = ?, \
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
        else documentoAtualizado = false;
      })
      .finally(() => {
        this.conexaoDB.end();
      });

    return documentoAtualizado;
  };

  procurar = async (filtro: IDocFiltro): Promise<IDocOut[]> => {
    let documentosEncontrados: IDocOut[] = null;
    let dadosQuery: IDocOut;

    this.abrirConexao();

    await this.conexaoDB
      .query(
        `SELECT * FROM doc_externo WHERE ${filtro.parametro} LIKE '%${filtro.valor}%'`
      )
      .then((resultado) => {
        const respostaQuery = <RowDataPacket>resultado[0];

        if (respostaQuery.length >= 1) {
          documentosEncontrados = [];

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

            documentosEncontrados.push(dadosQuery);
          }
        }
      })
      .finally(() => {
        this.conexaoDB.end();
      });

    return documentosEncontrados;
  };
}
