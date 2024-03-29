import {
  IDocIn,
  IDocOut,
  IDocRepository,
  IDocFiltroDados,
  IDocFiltroQuantidade,
} from "../interfaces/IDocRepository";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { injectable, inject } from "tsyringe";
import { IDatabase } from "../../../providers/interfaces/IDatabase";

@injectable()
export class DocInternoRepository implements IDocRepository {
  constructor(@inject("Database") private _Database: IDatabase) {}

  ler = async (filtro: IDocFiltroDados): Promise<IDocOut[]> => {
    let documentosRegistrados: IDocOut[] = [];
    let dadosQuery: IDocOut;

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

    if (filtro.Destino !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoDestino1 LIKE '%${filtro.Destino}%' OR InternoDestino2 LIKE '%${filtro.Destino}%' OR InternoDestino3 LIKE '%${filtro.Destino}%'`;
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

    sqlQuery += " ORDER BY InternoNrprotocolo DESC";

    if (filtro.Limit !== undefined) sqlQuery += ` LIMIT ${filtro.Limit}`;

    if (filtro.OffSet !== undefined) sqlQuery += ` OFFSET ${filtro.OffSet}`;

    const con = this._Database.abrirConexao();

    try {
      const query = await con.query(sqlQuery);

      const respostaQuery = <RowDataPacket>query[0];

      if (respostaQuery.length >= 1) {
        for (let i = 0; i < respostaQuery.length; i++) {
          dadosQuery = {
            id: respostaQuery[i].InternoID,
            assunto: respostaQuery[i].InternoAssunto,
            dataDocumento: respostaQuery[i].InternoDatadocumento,
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

    } catch (erro) {
      console.log(erro);
    } finally {
      con.end();
    }

    return documentosRegistrados;
  };

  lerQuantidade = async (filtro: IDocFiltroQuantidade): Promise<number> => {
    let documentosRegistrados = 0;

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

    if (filtro.Destino !== undefined) {
      if (quantidadeFiltros >= 1) sqlQuery += " AND";
      else sqlQuery += " WHERE";

      sqlQuery += ` InternoDestino1 LIKE '%${filtro.Destino}%' OR InternoDestino2 LIKE '%${filtro.Destino}%' OR InternoDestino3 LIKE '%${filtro.Destino}%'`;
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

    const con = this._Database.abrirConexao();

    try {
      const query = await con.query(sqlQuery);
        
      const dados = <RowDataPacket>query[0];

      documentosRegistrados = dados[0].quantDocumentos;

    } catch (erro) {
      console.log(erro);
    } finally {
      con.end();
    }

    return documentosRegistrados;
  };

  adicionar = async (documentoRecebido: IDocIn): Promise<Boolean> => {
    let documentoAdicionado = false;

    const con = this._Database.abrirConexao();

    try {
      const query = await con.query(
        "INSERT INTO doc_interno( \
      Internoespecificacao, \
      InternoDatadocumento, \
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
      );

      const { affectedRows } = <ResultSetHeader>query[0];

      if (affectedRows === 1) documentoAdicionado = true;
      
    } catch(erro) {
      console.log(erro);
    } finally{
      con.end();
    }

    return documentoAdicionado;
  };

  remover = async (documentoId: string): Promise<boolean> => {
    let documentoRemovido = false;

    const con = this._Database.abrirConexao();

    try {
      const query = await con.query("DELETE FROM doc_interno WHERE InternoID = ?", [documentoId]);
      const { affectedRows } = <ResultSetHeader>query[0];

      if (affectedRows === 1) documentoRemovido = true;
      else documentoRemovido = false;

    } catch (erro) {
      console.log(erro);
    } finally {
      con.end();
    }

    return documentoRemovido;
  };

  atualizar = async (documentoRecebido: IDocOut): Promise<boolean> => {
    let documentoAtualizado = false;

    const con = this._Database.abrirConexao();

    try {
      const query = await con.query(
        "UPDATE doc_interno SET \
      Internoespecificacao = ?, \
      InternoDatadocumento = ?, \
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
      );

      const { affectedRows } = <ResultSetHeader>query[0];

      if (affectedRows === 1) documentoAtualizado = true;

    } catch (erro) {
      console.log(erro);
    } finally {
      con.end();
    }

    return documentoAtualizado;
  };
}
