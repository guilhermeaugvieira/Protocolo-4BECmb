import { inject, injectable } from "tsyringe";
import { IUsuarioRepository } from "../../../database/repositories/interfaces/IUsuarioRepository";

@injectable()
export class UsuarioRemoverUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (usuarioId: string): Promise<boolean> => {
    return await this._repo.remover(usuarioId);
  };
}
