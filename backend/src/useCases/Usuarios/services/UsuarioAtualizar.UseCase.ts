import { inject, injectable } from "tsyringe";
import {
  IUsuarioAtualizarIn,
  IUsuarioRepository,
} from "../../../database/repositories/interfaces/IUsuarioRepository";
import { SistemaHash } from "../../../providers/BCrypt";

@injectable()
export class UsuarioAtualizarUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (usuario: IUsuarioAtualizarIn): Promise<boolean> => {
    const hash = new SistemaHash().gerar(usuario.senha);

    usuario.senha = hash;

    return await this._repo.atualizar(usuario);
  };
}
