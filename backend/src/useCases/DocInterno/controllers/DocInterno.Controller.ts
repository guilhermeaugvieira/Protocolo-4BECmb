import { Request, response, Response } from "express";
import { container } from "tsyringe";
import {
  IDocFiltro,
  IDocIn,
  IDocOut,
} from "../../../database/repositories/interfaces/IDocRepository";
import { DocInternoAdicionarUseCase } from "../services/DocInternoAdicionar.UseCase";
import { DocInternoAtualizarUseCase } from "../services/DocInternoAtualizar.UseCase";
import { DocInternoLerUseCase } from "../services/DocInternoLer.UseCase";
import { DocInternoLerPorIdUseCase } from "../services/DocInternoLerPorId.UseCase";
import { DocInternoProcurarUseCase } from "../services/DocInternoProcurar.UseCase";
import { DocInternoRemoverUseCase } from "../services/DocInternoRemover.UseCase";

export class DocInternoController {
  constructor() {}

  lerDocumentos = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const _DocInternoLer = container.resolve(DocInternoLerUseCase);

    return resposta.json(await _DocInternoLer.execute());
  };

  lerDocumentoPorId = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const documentoID = requisicao.params.documentoID;

    if (documentoID === " ")
      return resposta.json("Documento não foi enviado para verificação");

    const _DocInternoLerPorId = container.resolve(DocInternoLerPorIdUseCase);

    return resposta.json(await _DocInternoLerPorId.execute(documentoID));
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

    const _DocInternoAdicionar = container.resolve(DocInternoAdicionarUseCase);

    return resposta.json(
      await _DocInternoAdicionar.execute(documentoAdicionado)
    );
  };

  remover = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const documentoId = requisicao.params.documentoId;

    if (documentoId === " ")
      return resposta.json("Documento não enviado para verificação");

    const _DocInternoLerPorId = container.resolve(DocInternoLerPorIdUseCase);

    if ((await _DocInternoLerPorId.execute(documentoId)) === null)
      return resposta.json("Documento não existe");

    const _DocInternoRemover = container.resolve(DocInternoRemoverUseCase);

    return resposta.json(await _DocInternoRemover.execute(documentoId));
  };

  atualizar = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const documentoId = requisicao.params.documentoId;

    if (documentoId === " ")
      return resposta.json("Documento não enviado para verificação");

    const _DocInternoLerPorId = container.resolve(DocInternoLerPorIdUseCase);

    if ((await _DocInternoLerPorId.execute(documentoId)) === null)
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

    const _DocInternoAtualizar = container.resolve(DocInternoAtualizarUseCase);

    return resposta.json(
      await _DocInternoAtualizar.execute(documentoAtualizado)
    );
  };

  procurar = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const parametro = requisicao.params.parametro;
    const valor = requisicao.params.valor;

    if (parametro === " ")
      return response.json("Parâmetro foi enviado corretamente");

    if (valor === " ")
      return response.json("Valor não foi enviado corretamente");

    const filtro: IDocFiltro = {
      parametro: parametro,
      valor: valor,
    };

    const _DocInternoProcurar = container.resolve(DocInternoProcurarUseCase);

    return resposta.json(await _DocInternoProcurar.execute(filtro));
  };
}
