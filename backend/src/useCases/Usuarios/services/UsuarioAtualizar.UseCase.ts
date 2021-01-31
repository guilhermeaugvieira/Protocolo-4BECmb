import { container, inject, injectable } from "tsyringe";
import {
  IUsuarioAtualizarIn,
  IUsuarioRepository,
} from "../../../database/repositories/interfaces/IUsuarioRepository";

@injectable()
export class UsuarioAtualizarUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (usuario: IUsuarioAtualizarIn): Promise<boolean> => {
    return await this._repo.atualizar(usuario);
  };
}
