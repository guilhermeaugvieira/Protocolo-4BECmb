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
  ): Promise<boolean> => {
    const dadosUsuario: IUsuarioOut = await this._repo.login(usuarioLogin);

    if (dadosUsuario !== undefined && usuarioSenha === dadosUsuario.senha) {
      const jwt = jsonwebtoken;
      const token = jsonwebtoken.sign(dadosUsuario, process.env.APP_SECRET, {
        expiresIn: 300,
      });
      console.log(token);
      return true;
    } else return false;
  };
}
