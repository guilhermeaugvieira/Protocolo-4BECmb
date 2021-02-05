import { inject, injectable } from "tsyringe";
import {
  IUsuarioAtualizarIn,
  IUsuarioRepository,
} from "../../../database/repositories/interfaces/IUsuarioRepository";
import bcrypt from "bcrypt";

@injectable()
export class UsuarioAtualizarUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (usuario: IUsuarioAtualizarIn): Promise<boolean> => {
    const hash = bcrypt.hashSync(
      usuario.senha,
      parseInt(process.env.BCRYPT_SALTS)
    );

    usuario.senha = hash;

    return await this._repo.atualizar(usuario);
  };
}
