import { injectable, inject, container } from "tsyringe";
import { UsuarioRepository } from "../../database/repositories/implementation/UsuarioRepository";
import {
  IUsuarioOut,
  IUsuarioRepository,
} from "../../database/repositories/interfaces/IUsuarioRepository";

@injectable()
export class UsuarioLerPorIdUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (usuarioId: string): Promise<IUsuarioOut> => {
    return await this._repo.lerPorId(usuarioId);
  };
}
