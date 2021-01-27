import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { UsuarioAdicionarUseCase } from "./UsuarioAdicionarUseCase";
import {
  IUsuarioAdicionarIn,
  IUsuarioAtualizarIn,
} from "../../database/repositories/interfaces/IUsuarioRepository";
import { UsuarioRemoverUseCase } from "./UsuarioRemoverUseCase";
import { UsuarioLerUseCase } from "./UsuarioLerUseCase";
import { server } from "../../server";
import { UsuarioAtualizarUseCase } from "./UsuarioAtualizarUseCase";

export class UsuarioController {
  constructor() {}

  lerUsuarios = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const _UsuarioLerUseCase = container.resolve(UsuarioLerUseCase);

    return resposta.json(await _UsuarioLerUseCase.execute());
  };

  removerUsuario = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const usuarioId = requisicao.params.id;

    const _UsuarioRemoverUseCase = container.resolve(UsuarioRemoverUseCase);

    return resposta.json(await _UsuarioRemoverUseCase.execute(usuarioId));
  };

  adicionarUsuario = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const { nome, usuario, senha } = requisicao.body;

    if (nome.length < 1 || nome.length > 20 || nome == null)
      return resposta.json(
        "Nome preenchido não cumpre com o que foi estabelecido"
      );

    if (usuario.length < 1 || usuario.length > 20 || usuario == null)
      return resposta.json(
        "Usuário preenchido não cumpre com o que foi estabelecido"
      );

    if (senha.length < 1 || senha.length > 20 || senha == null)
      return resposta.json(
        "Senha preenchido não cumpre com o que foi estabelecido"
      );

    const _UsuarioAdicionar = container.resolve(UsuarioAdicionarUseCase);

    const dadosUsuario: IUsuarioAdicionarIn = {
      nome: nome,
      login: usuario,
      senha: senha,
    };

    return resposta.json(await _UsuarioAdicionar.execute(dadosUsuario));
  };

  atualizarUsuario = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const { nome, senha } = requisicao.body;
    const id = requisicao.params.id;

    if (nome.length < 1 || nome.length > 20 || nome == null)
      return resposta.json("Nome preenchido não cumpre com o estabelecido");

    if (senha.length < 1 || senha.length > 20 || senha == null)
      return resposta.json("Resposta preenchido não cumpre com o estabelecido");

    if (id == null) return resposta.json("Id recebido não existe no banco");

    const dadosUsuario: IUsuarioAtualizarIn = {
      id: id,
      nome: nome,
      senha: senha,
    };

    const _UsuarioAtualizarUseCase = container.resolve(UsuarioAtualizarUseCase);

    return resposta.json(await _UsuarioAtualizarUseCase.execute(dadosUsuario));
  };
}
