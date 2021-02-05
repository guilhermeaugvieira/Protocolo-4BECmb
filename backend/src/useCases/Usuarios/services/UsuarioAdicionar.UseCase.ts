import { inject, injectable } from "tsyringe";
import {
  IUsuarioRepository,
  IUsuarioAdicionarIn,
} from "../../../database/repositories/interfaces/IUsuarioRepository";
import bcrypt from "bcrypt";

@injectable()
export class UsuarioAdicionarUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (usuarioRecebido: IUsuarioAdicionarIn): Promise<boolean> => {
    const hash = bcrypt.hashSync(
      usuarioRecebido.senha,
      parseInt(process.env.BCRYPT_SALTS)
    );

    usuarioRecebido.senha = hash;

    return await this._repo.adicionar(usuarioRecebido);
  };
}
