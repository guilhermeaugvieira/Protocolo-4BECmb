import { Request, response, Response } from "express";
import { container } from "tsyringe";
import {
  IDocFiltroDados,
  IDocFiltroQuantidade,
  IDocIn,
  IDocOut,
} from "../../../database/repositories/interfaces/IDocRepository";
import { DocExternoAdicionarUseCase } from "../services/DocExternoAdicionar.UseCase";
import { DocExternoAtualizarUseCase } from "../services/DocExternoAtualizar.UseCase";
import { DocExternoLerUseCase } from "../services/DocExternoLer.UseCase";
import { DocExternoLerQuantidadeUseCase } from "../services/DocExternoLerQuantidade.UseCase";
import { DocExternoRemoverUseCase } from "../services/DocExternoRemover.UseCase";

export class DocExternoController {
  constructor() {}

  lerDocumentos = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const filtro: IDocFiltroDados = {
      Assunto:
        requisicao.query.Assunto !== undefined
          ? <string>requisicao.query.Assunto
          : undefined,
      Datadocumento:
        requisicao.query.Datadocumento !== undefined
          ? <string>requisicao.query.Datadocumento
          : undefined,
      Datarecebimento:
        requisicao.query.Datarecebimento !== undefined
          ? <string>requisicao.query.Datarecebimento
          : undefined,
      ID:
        requisicao.query.ID !== undefined
          ? parseInt(<string>requisicao.query.ID)
          : undefined,
      Procedencia:
        requisicao.query.Procedencia !== undefined
          ? <string>requisicao.query.Procedencia
          : undefined,
      Nrprotocolo:
        requisicao.query.Nrprotocolo !== undefined
          ? <string>requisicao.query.Nrprotocolo
          : undefined,
      especificacao:
        requisicao.query.especificacao !== undefined
          ? <string>requisicao.query.especificacao
          : undefined,
      Destino:
        requisicao.query.Destino !== undefined
          ? <string>requisicao.query.Destino
          : undefined,
      Limit:
        requisicao.query.Limit !== undefined
          ? parseInt(<string>requisicao.query.Limit)
          : undefined,
      OffSet:
        requisicao.query.OffSet !== undefined &&
        requisicao.query.Limit !== undefined
          ? parseInt(<string>requisicao.query.OffSet)
          : undefined,
    };

    const _DocExternoLer = container.resolve(DocExternoLerUseCase);

    return resposta.json(await _DocExternoLer.execute(filtro));
  };

  lerDocumentosQuantidade = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const filtro: IDocFiltroQuantidade = {
      Assunto:
        requisicao.query.Assunto !== undefined
          ? <string>requisicao.query.Assunto
          : undefined,
      Datadocumento:
        requisicao.query.Datadocumento !== undefined
          ? <string>requisicao.query.Datadocumento
          : undefined,
      Datarecebimento:
        requisicao.query.Datarecebimento !== undefined
          ? <string>requisicao.query.Datarecebimento
          : undefined,
      ID:
        requisicao.query.ID !== undefined
          ? parseInt(<string>requisicao.query.ID)
          : undefined,
      Procedencia:
        requisicao.query.Procedencia !== undefined
          ? <string>requisicao.query.Procedencia
          : undefined,
      Nrprotocolo:
        requisicao.query.Nrprotocolo !== undefined
          ? <string>requisicao.query.Nrprotocolo
          : undefined,
      especificacao:
        requisicao.query.especificacao !== undefined
          ? <string>requisicao.query.especificacao
          : undefined,
      Destino:
        requisicao.query.Destino !== undefined
          ? <string>requisicao.query.Destino
          : undefined,
    };

    const _DocExternoLerQuantidade = container.resolve(
      DocExternoLerQuantidadeUseCase
    );

    return resposta.json(await _DocExternoLerQuantidade.execute(filtro));
  };

  adicionar = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const {
      especificacao,
      dataDocumento,
      procedencia,
      dataRecebimento,
      nrProtocolo,
      assunto,
      destino1,
      destino2,
      destino3,
    } = requisicao.body;

    if (
      especificacao === undefined ||
      especificacao.length < 1 ||
      especificacao.length > 200
    )
      return resposta.json("Especificação preenchida incorretamente");

    if (
      dataDocumento === undefined ||
      dataDocumento.length < 1 ||
      dataDocumento.length > 20
    )
      return resposta.json("Data do documento preenchida incorretamente");

    if (
      procedencia === undefined ||
      procedencia.length < 1 ||
      procedencia.length > 100
    )
      return resposta.json("Procedencia preenchida incorretamente");

    if (
      dataRecebimento === undefined ||
      dataRecebimento.length < 1 ||
      dataRecebimento.length > 20
    )
      return resposta.json("Data do recebimento preenchida incorretamente");

    if (
      nrProtocolo === undefined ||
      nrProtocolo.length < 1 ||
      nrProtocolo.length > 20
    )
      return resposta.json("Número do protocolo preenchido incorretamente");

    if (assunto === undefined || assunto.length < 1 || assunto.length > 100)
      return resposta.json("Número do protocolo preenchido incorretamente");

    if (destino1 !== undefined)
      if (destino1.length < 1 || destino1.length > 100)
        return resposta.json("1° Destino preenchido incorretamente");

    if (destino2 !== undefined)
      if (destino2.length < 1 || destino2.length > 100)
        return resposta.json("2° Destino preenchido incorretamente");

    if (destino3 !== undefined)
      if (destino3.length < 1 || destino3.length > 100)
        return resposta.json("3° Destino preenchido incorretamente");

    const documentoAdicionado: IDocIn = {
      assunto: assunto,
      especificacao: especificacao,
      dataDocumento: dataDocumento,
      dataRecebimento: dataRecebimento,
      nrProtocolo: nrProtocolo,
      procedencia: procedencia,
      destino1: destino1 === undefined ? null : destino1,
      destino2: destino2 === undefined ? null : destino2,
      destino3: destino3 === undefined ? null : destino3,
    };

    const _DocExternoAdicionar = container.resolve(DocExternoAdicionarUseCase);

    return resposta.json(
      await _DocExternoAdicionar.execute(documentoAdicionado)
    );
  };

  remover = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const documentoId = requisicao.params.documentoId;

    if (documentoId === " ")
      return resposta.json("Documento não foi enviado para remoção");

    const _DocInternoLerQuantidade = container.resolve(
      DocExternoLerQuantidadeUseCase
    );

    const filtro: IDocFiltroQuantidade = {
      ID: parseInt(documentoId),
    };

    if ((await _DocInternoLerQuantidade.execute(filtro)) === 0)
      return resposta.json("Documento não existe");

    const _DocExternoRemover = container.resolve(DocExternoRemoverUseCase);

    return resposta.json(await _DocExternoRemover.execute(documentoId));
  };

  atualizar = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const documentoId = requisicao.params.documentoId;

    if (documentoId === " ")
      return resposta.json("Documento não foi enviado para verificação");

    const _DocInternoLerQuantidade = container.resolve(
      DocExternoLerQuantidadeUseCase
    );

    const filtro: IDocFiltroQuantidade = {
      ID: parseInt(documentoId),
    };

    if ((await _DocInternoLerQuantidade.execute(filtro)) === 0)
      return resposta.json("Documento não existe");

    const {
      especificacao,
      dataDocumento,
      procedencia,
      dataRecebimento,
      nrProtocolo,
      assunto,
      destino1,
      destino2,
      destino3,
    } = requisicao.body;

    if (
      especificacao === undefined ||
      especificacao.length < 1 ||
      especificacao.length > 200
    )
      return resposta.json("Especificação preenchida incorretamente");

    if (
      dataDocumento === undefined ||
      dataDocumento.length < 1 ||
      dataDocumento.length > 20
    )
      return resposta.json("Data do documento preenchida incorretamente");

    if (
      procedencia === undefined ||
      procedencia.length < 1 ||
      procedencia.length > 100
    )
      return resposta.json("Procedencia preenchida incorretamente");

    if (
      dataRecebimento === undefined ||
      dataRecebimento.length < 1 ||
      dataRecebimento.length > 20
    )
      return resposta.json("Data do recebimento preenchida incorretamente");

    if (
      nrProtocolo === undefined ||
      nrProtocolo.length < 1 ||
      nrProtocolo.length > 20
    )
      return resposta.json("Número do protocolo preenchido incorretamente");

    if (assunto === undefined || assunto.length < 1 || assunto.length > 100)
      return resposta.json("Número do protocolo preenchido incorretamente");

    if (destino1 !== undefined)
      if (destino1.length < 1 || destino1.length > 100)
        return resposta.json("1° Destino preenchido incorretamente");

    if (destino2 !== undefined && destino2 !== null)
      if (destino2.length < 1 || destino2.length > 100)
        return resposta.json("2° Destino preenchido incorretamente");

    if (destino3 !== undefined && destino3 !== null)
      if (destino3.length < 1 || destino3.length > 100)
        return resposta.json("3° Destino preenchido incorretamente");

    const documentoAtualizado: IDocOut = {
      assunto: assunto,
      dataDocumento: dataDocumento,
      dataRecebimento: dataRecebimento,
      especificacao: especificacao,
      id: parseInt(documentoId),
      nrProtocolo: nrProtocolo,
      procedencia: procedencia,
      destino1: destino1 === undefined ? null : destino1,
      destino2: destino2 === undefined && destino2 === null ? null : destino2,
      destino3: destino3 === undefined && destino3 === null ? null : destino3,
    };

    const _DocExternoAtualizar = container.resolve(DocExternoAtualizarUseCase);

    return resposta.json(
      await _DocExternoAtualizar.execute(documentoAtualizado)
    );
  };
}
