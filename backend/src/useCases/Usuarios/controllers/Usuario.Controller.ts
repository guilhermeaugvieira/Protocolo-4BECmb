import { Request, Response } from "express";
import { container } from "tsyringe";
import {
  IUsuarioAdicionarIn,
  IUsuarioAtualizarIn,
  IUsuarioFiltroDados,
  IUsuarioFiltroQuantidade,
} from "../../../database/repositories/interfaces/IUsuarioRepository";
import { UsuarioRemoverUseCase } from "../services/UsuarioRemover.UseCase";
import { UsuarioLerUseCase } from "../services/UsuarioLer.UseCase";
import { UsuarioAtualizarUseCase } from "../services/UsuarioAtualizar.UseCase";
import { UsuarioAdicionarUseCase } from "../services/UsuarioAdicionar.UseCase";
import { UsuarioLerQuantidadeUseCase } from "../services/UsuarioLerQuantidade.UseCase";
import { UsuarioLoginUseCase } from "../services/UsuarioLogin.UseCase";

export class UsuarioController {
  constructor() {}

  lerUsuarios = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const filtro: IUsuarioFiltroDados = {
      ID:
        requisicao.query.ID !== undefined
          ? parseInt(<string>requisicao.query.ID)
          : undefined,
      Login:
        requisicao.query.Login !== undefined
          ? <string>requisicao.query.UsuarioLogin
          : undefined,
      Nome:
        requisicao.query.Nome !== undefined
          ? <string>requisicao.query.Nome
          : undefined,
      Senha:
        requisicao.query.Senha !== undefined
          ? <string>requisicao.query.Senha
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

    const _UsuarioLer = container.resolve(UsuarioLerUseCase);

    return resposta.json(await _UsuarioLer.execute(filtro));
  };

  lerUsuariosQuantidade = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const filtro: IUsuarioFiltroQuantidade = {
      ID:
        requisicao.query.ID !== undefined
          ? parseInt(<string>requisicao.query.ID)
          : undefined,
      Login:
        requisicao.query.Login !== undefined
          ? <string>requisicao.query.Login
          : undefined,
      Nome:
        requisicao.query.Nome !== undefined
          ? <string>requisicao.query.Nome
          : undefined,
      Senha:
        requisicao.query.Senha !== undefined
          ? <string>requisicao.query.Senha
          : undefined,
    };

    const _UsuarioLerQuantidade = container.resolve(
      UsuarioLerQuantidadeUseCase
    );

    return resposta.json(await _UsuarioLerQuantidade.execute(filtro));
  };

  remover = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const usuarioId = requisicao.params.usuarioId;

    if (usuarioId === " ")
      return resposta.json("Usuário não enviado para remoção");

    const filtro: IUsuarioFiltroQuantidade = {
      ID: parseInt(usuarioId),
    };

    const _UsuarioLerQuantidade = container.resolve(
      UsuarioLerQuantidadeUseCase
    );

    if ((await _UsuarioLerQuantidade.execute(filtro)) === 0)
      return resposta.json("Usuário não registrado no sistema");

    const _UsuarioRemover = container.resolve(UsuarioRemoverUseCase);

    return resposta.json(await _UsuarioRemover.execute(usuarioId));
  };

  adicionarUsuario = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const { nome, usuario, senha } = requisicao.body;

    if (nome === undefined || nome.length < 1 || nome.length > 20)
      return resposta.json("Nome não foi enviado corretamente");

    if (usuario === undefined || usuario.length < 1 || usuario.length > 20)
      return resposta.json("Usuário não foi enviada corretamente");

    if (senha === undefined || senha.length < 1 || senha.length > 20)
      return resposta.json("Senha não foi enviada corretamente");

    const _UsuarioLerQuantidade = container.resolve(
      UsuarioLerQuantidadeUseCase
    );

    const filtro: IUsuarioFiltroQuantidade = {
      Login: usuario,
    };

    if ((await _UsuarioLerQuantidade.execute(filtro)) !== 0)
      return resposta.json("Já existe usuário com esse login cadastrado");

    const dadosUsuario: IUsuarioAdicionarIn = {
      nome: nome,
      login: usuario,
      senha: senha,
    };

    const _UsuarioAdicionar = container.resolve(UsuarioAdicionarUseCase);

    return resposta.json(await _UsuarioAdicionar.execute(dadosUsuario));
  };

  atualizarUsuario = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const { nome, senha } = requisicao.body;
    const usuarioId = requisicao.params.usuarioId;

    if (usuarioId === " ")
      return resposta.json("Usuário não foi enviado corretamente");

    const _UsuarioLerQuantidade = container.resolve(
      UsuarioLerQuantidadeUseCase
    );

    const filtro: IUsuarioFiltroQuantidade = {
      ID: parseInt(usuarioId),
    };

    if ((await _UsuarioLerQuantidade.execute(filtro)) === 0)
      return resposta.json("Usuário não registrado no sistema");

    if (senha === undefined || senha.length < 1 || senha.length > 20)
      return resposta.json("Senha não foi enviada corretamente");

    if (nome === undefined || nome.length < 1 || nome.length > 20)
      return resposta.json("Nome não foi enviado corretamente");

    const dadosUsuario: IUsuarioAtualizarIn = {
      id: usuarioId,
      nome: nome,
      senha: senha,
    };

    const _UsuarioAtualizar = container.resolve(UsuarioAtualizarUseCase);

    return resposta.json(await _UsuarioAtualizar.execute(dadosUsuario));
  };

  login = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const { login, senha } = requisicao.body;

    if (login === undefined) return resposta.json("Usuário não enviado");

    if (senha === undefined) return resposta.json("Senha não enviada");

    const filtro: IUsuarioFiltroDados = {
      Login: login,
    };

    const _UsuarioLogin = container.resolve(UsuarioLoginUseCase);

    return resposta.json(await _UsuarioLogin.execute(filtro, senha));
  };
}
