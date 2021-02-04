import { inject, injectable } from "tsyringe";
import {
  IUsuarioOut,
  IUsuarioRepository,
} from "../../../database/repositories/interfaces/IUsuarioRepository";
import jsonwebtoken from "jsonwebtoken";

@injectable()
export class UsuarioLoginUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (
    usuarioLogin: string,
    usuarioSenha: string
  ): Promise<string> => {
    const dadosUsuario: IUsuarioOut = await this._repo.login(usuarioLogin);

    if (dadosUsuario !== undefined && usuarioSenha === dadosUsuario.senha) {
      const jwt = jsonwebtoken;
      const token = jsonwebtoken.sign(dadosUsuario, process.env.APP_SECRET, {
        expiresIn: "6h",
      });

      return token;
    } else {
      return "Usuário não encontrado";
    }
  };
}
