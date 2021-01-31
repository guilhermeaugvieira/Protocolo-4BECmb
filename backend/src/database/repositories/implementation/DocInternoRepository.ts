import {
  IDocFiltro,
  IDocIn,
  IDocOut,
  IDocRepository,
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

  ler = async (): Promise<IDocOut[]> => {
    let documentosRegistrados: IDocOut[] = null;
    let dadosQuery: IDocOut;

    this.abrirConexao();

    await this.conexaoDB
      .query("SELECT * FROM doc_interno")
      .then((resultado) => {
        const respostaQuery = <RowDataPacket>resultado[0];

        if (respostaQuery.length >= 1) {
          documentosRegistrados = [];

          for (let i = 0; i < respostaQuery.length; i++) {
            dadosQuery = {
              id: respostaQuery[i].InternoID,
              assunto: respostaQuery[i].InternoAssunto,
              dataDocumento: respostaQuery[i].InternoDataDocumento,
              dataRecebimento: respostaQuery[i].InternoDatarecebimento,
              especificacao: respostaQuery[i].Internoespecificacao,
              nrProtocolo: respostaQuery[i].InternoNrprotocolo,
              procedencia: respostaQuery[i].InternoProcedencia,
              destino1: respostaQuery[i].InternoDestino1,
              destino2: respostaQuery[i].InternoDestino2,
              destino3: respostaQuery[i].InternoDestino3,
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
      .query("SELECT * FROM doc_interno WHERE InternoID = ?", [documentoId])
      .then((resultado) => {
        const respostaQuery = <RowDataPacket>resultado[0];

        if (respostaQuery.length === 1) {
          documentoEncontrado = {
            id: respostaQuery[0].InternoID,
            assunto: respostaQuery[0].InternoAssunto,
            dataDocumento: respostaQuery[0].InternoDataDocumento,
            dataRecebimento: respostaQuery[0].InternoDatarecebimento,
            especificacao: respostaQuery[0].Internoespecificacao,
            nrProtocolo: respostaQuery[0].InternoNrprotocolo,
            procedencia: respostaQuery[0].InternoProcedencia,
            destino1: respostaQuery[0].InternoDestino1,
            destino2: respostaQuery[0].InternoDestino2,
            destino3: respostaQuery[0].InternoDestino3,
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

  procurar = async (filtro: IDocFiltro): Promise<IDocOut[]> => {
    let documentosEncontrados: IDocOut[] = null;
    let dadosQuery: IDocOut;

    this.abrirConexao();

    await this.conexaoDB
      .query(
        `SELECT * FROM doc_interno WHERE ${filtro.parametro} LIKE '%${filtro.valor}%'`
      )
      .then((resultado) => {
        const respostaQuery = <RowDataPacket>resultado[0];

        if (respostaQuery.length >= 1) {
          documentosEncontrados = [];

          for (let i = 0; i < respostaQuery.length; i++) {
            dadosQuery = {
              id: respostaQuery[i].InternoID,
              assunto: respostaQuery[i].InternoAssunto,
              dataDocumento: respostaQuery[i].InternoDataDocumento,
              dataRecebimento: respostaQuery[i].InternoDatarecebimento,
              especificacao: respostaQuery[i].Internoespecificacao,
              nrProtocolo: respostaQuery[i].InternoNrprotocolo,
              procedencia: respostaQuery[i].InternoProcedencia,
              destino1: respostaQuery[i].InternoDestino1,
              destino2: respostaQuery[i].InternoDestino2,
              destino3: respostaQuery[i].InternoDestino3,
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
