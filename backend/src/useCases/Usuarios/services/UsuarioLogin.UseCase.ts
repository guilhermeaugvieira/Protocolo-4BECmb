import { container, inject, injectable } from "tsyringe";
import {
  IUsuarioFiltroDados,
  IUsuarioOut,
  IUsuarioRepository,
} from "../../../database/repositories/interfaces/IUsuarioRepository";
import { UsuarioLerUseCase } from "./UsuarioLer.UseCase";
import jsonwebtoken from "jsonwebtoken";
import bcrypt, { compare } from "bcrypt";

@injectable()
export class UsuarioLoginUseCase {
  constructor(@inject("UsuarioRepository") _repo: IUsuarioRepository) {}

  execute = async (
    filtro: IUsuarioFiltroDados,
    senhaUsuario: string
  ): Promise<string> => {
    const _UsuarioLer = container.resolve(UsuarioLerUseCase);

    let resultadoPesquisa: IUsuarioOut[];
    let usuarioBanco: IUsuarioOut;

    resultadoPesquisa = await _UsuarioLer.execute(filtro);

    if (resultadoPesquisa.length === 1) {
      (await _UsuarioLer.execute(filtro)).map((usuario) => {
        usuarioBanco = usuario;
      });

      if (bcrypt.compareSync(senhaUsuario, usuarioBanco.senha)) {
        const token = jsonwebtoken.sign(usuarioBanco, process.env.APP_SECRET, {
          expiresIn: "6h",
        });

        return token;
      }
    }

    return "Usuário não encontrado";
  };
}
