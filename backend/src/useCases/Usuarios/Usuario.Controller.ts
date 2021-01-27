import { Request, Response } from "express";
import { container } from "tsyringe";
import { UsuarioAdicionarUseCase } from "./UsuarioAdicionarUseCase";
import { IUsuarioAdicionarIn } from "../../database/repositories/interfaces/IUsuarioRepository";
import { UsuarioRemoverUseCase } from "./UsuarioRemoverUseCase";

export class UsuarioController {
  constructor() {}

  verificaDadosEntrada = (
    nome: string,
    usuario: string,
    senha: string
  ): string => {
    if (nome.length < 1 || nome.length > 20)
      return "Nome deve conter entre 1 a 20 digitos";

    if (usuario.length < 1 || usuario.length > 20)
      return "Usuario deve conter entre 1 a 20 digitos";

    if (senha.length < 1 || senha.length > 20)
      return "Senha deve conter entre 1 a 20 digitos";

    return "Dados OK";
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

    const verificacaoDados = this.verificaDadosEntrada(nome, usuario, senha);

    if (verificacaoDados !== "Dados OK") return resposta.json(verificacaoDados);

    const _UsuarioAdicionar = container.resolve(UsuarioAdicionarUseCase);

    const dadosUsuario: IUsuarioAdicionarIn = {
      nome: nome,
      login: usuario,
      senha: senha,
    };

    return resposta.json(await _UsuarioAdicionar.execute(dadosUsuario));
  };
}
