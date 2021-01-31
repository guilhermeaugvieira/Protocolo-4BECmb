import { Request, response, Response } from "express";
import { container } from "tsyringe";
import {
  IDocFiltro,
  IDocIn,
  IDocOut,
} from "../../../database/repositories/interfaces/IDocRepository";
import { DocExternoAdicionarUseCase } from "../services/DocExternoAdicionar.UseCase";
import { DocExternoAtualizarUseCase } from "../services/DocExternoAtualizar.UseCase";
import { DocExternoLerUseCase } from "../services/DocExternoLer.UseCase";
import { DocExternoLerPorIdUseCase } from "../services/DocExternoLerPorId.UseCase";
import { DocExternoProcurarUseCase } from "../services/DocExternoProcurar.UseCase";
import { DocExternoRemoverUseCase } from "../services/DocExternoRemover.UseCase";

export class DocExternoController {
  constructor() {}

  lerDocumentos = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const _DocExternoLer = container.resolve(DocExternoLerUseCase);

    return resposta.json(await _DocExternoLer.execute());
  };

  lerDocumentoPorId = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const documentoId = requisicao.params.documentoID;

    if (documentoId === " ")
      return resposta.json("Documento não foi enviado para verificação");

    const _DocExternoLerPorId = container.resolve(DocExternoLerPorIdUseCase);

    return resposta.json(await _DocExternoLerPorId.execute(documentoId));
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

    const _DocExternoLerPorId = container.resolve(DocExternoLerPorIdUseCase);

    if ((await _DocExternoLerPorId.execute(documentoId)) === null)
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

    const _DocExternoLerPorId = container.resolve(DocExternoLerPorIdUseCase);

    if ((await _DocExternoLerPorId.execute(documentoId)) === null)
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

    if (destino2 !== undefined)
      if (destino2.length < 1 || destino2.length > 100)
        return resposta.json("2° Destino preenchido incorretamente");

    if (destino3 !== undefined)
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
      destino2: destino2 === undefined ? null : destino2,
      destino3: destino3 === undefined ? null : destino3,
    };

    const _DocExternoAtualizar = container.resolve(DocExternoAtualizarUseCase);

    return resposta.json(
      await _DocExternoAtualizar.execute(documentoAtualizado)
    );
  };

  procurar = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const parametro = requisicao.params.parametro;
    let valor = requisicao.params.valor;

    const filtro: IDocFiltro = {
      parametro: parametro,
      valor: valor,
    };

    const _DocExternoProcurar = container.resolve(DocExternoProcurarUseCase);

    return resposta.json(await _DocExternoProcurar.execute(filtro));
  };
}
