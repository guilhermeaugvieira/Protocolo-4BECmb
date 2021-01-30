import { container, inject, injectable } from "tsyringe";
import { UsuarioRepository } from "../../database/repositories/implementation/UsuarioRepository";
import {
  IUsuarioAtualizarIn,
  IUsuarioOut,
  IUsuarioRepository,
} from "../../database/repositories/interfaces/IUsuarioRepository";

@injectable()
export class UsuarioAtualizarUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (usuario: IUsuarioAtualizarIn): Promise<boolean> => {
    return await this._repo.atualizar(usuario);
  };
}
