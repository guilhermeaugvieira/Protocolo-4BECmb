import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { UsuarioAdicionarUseCase } from "./UsuarioAdicionarUseCase";
import {
  IUsuarioAcessoIn,
  IUsuarioAdicionarIn,
  IUsuarioAtualizarIn,
} from "../../database/repositories/interfaces/IUsuarioRepository";
import { UsuarioRemoverUseCase } from "./UsuarioRemoverUseCase";
import { UsuarioLerUseCase } from "./UsuarioLerUseCase";
import { UsuarioAtualizarUseCase } from "./UsuarioAtualizarUseCase";
import { UsuarioLerPorIdUseCase } from "./UsuarioLerPorIdUseCase";
import { UsuarioVericarAcessoUseCase } from "./UsuarioVerificarAcessoUseCase";

export class UsuarioController {
  constructor() {}

  lerUsuarios = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const _UsuarioLerUseCase = container.resolve(UsuarioLerUseCase);

    return resposta.json(await _UsuarioLerUseCase.execute());
  };

  lerPorId = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const usuarioId = requisicao.params.id;

    if (usuarioId === "" || usuarioId === undefined)
      return resposta.json("Usuário não enviado para verificação");

    const _UsuarioLerPorIdUseCase = container.resolve(UsuarioLerPorIdUseCase);

    return resposta.json(await _UsuarioLerPorIdUseCase.execute(usuarioId));
  };

  removerUsuario = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const usuarioId = requisicao.params.id;

    const _UsuarioLerPorIdUseCase = container.resolve(UsuarioLerPorIdUseCase);

    if ((await _UsuarioLerPorIdUseCase.execute(usuarioId)) === null)
      return resposta.json("Usuário não registrado no sistema");

    const _UsuarioRemoverUseCase = container.resolve(UsuarioRemoverUseCase);

    return resposta.json(await _UsuarioRemoverUseCase.execute(usuarioId));
  };

  adicionarUsuario = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const { nome, usuario, senha } = requisicao.body;

    if (nome.length < 1 || nome.length > 20 || nome == null)
      return resposta.json("Nome não foi enviada corretamente");

    if (usuario.length < 1 || usuario.length > 20 || usuario == null)
      return resposta.json("Usuário não foi enviada corretamente");

    if (senha.length < 1 || senha.length > 20 || senha == null)
      return resposta.json("Senha não foi enviada corretamente");

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
    const id = requisicao.params.id;

    const _UsuarioLerPorIdUseCase = container.resolve(UsuarioLerPorIdUseCase);

    if ((await _UsuarioLerPorIdUseCase.execute(id)) === null)
      return resposta.json("Usuário não registrado no sistema");

    if (nome.length < 1 || nome.length > 20 || nome == null)
      return resposta.json("Nome não foi enviado corretamente");

    if (senha.length < 1 || senha.length > 20 || senha == null)
      return resposta.json("Senha não foi enviado corretamente");

    const dadosUsuario: IUsuarioAtualizarIn = {
      id: id,
      nome: nome,
      senha: senha,
    };

    const _UsuarioAtualizarUseCase = container.resolve(UsuarioAtualizarUseCase);

    return resposta.json(await _UsuarioAtualizarUseCase.execute(dadosUsuario));
  };

  verificarAcesso = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const { login, senha } = requisicao.body;

    if (login === "" || login === null)
      return resposta.json("Usuário não foi enviado corretamente");

    if (senha === "" || login === null)
      return resposta.json("Senha não foi enviada corretamente");

    const usuario: IUsuarioAcessoIn = {
      login: login,
      senha: senha,
    };

    const _UsuarioVerificarAcessoUseCase = container.resolve(
      UsuarioVericarAcessoUseCase
    );

    return resposta.json(await _UsuarioVerificarAcessoUseCase.execute(usuario));
  };
}
