import { injectable, inject } from "tsyringe";
import {
  IUsuarioOut,
  IUsuarioRepository,
} from "../../../database/repositories/interfaces/IUsuarioRepository";

@injectable()
export class UsuarioLerPorIdUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (usuarioId: string): Promise<IUsuarioOut> => {
    return await this._repo.lerPorId(usuarioId);
  };
}
