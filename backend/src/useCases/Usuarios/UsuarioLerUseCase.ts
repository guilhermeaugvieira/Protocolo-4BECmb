import { container, inject, injectable } from "tsyringe";
import { UsuarioRepository } from "../../database/repositories/implementation/UsuarioRepository";
import {
  IUsuarioRepository,
  IUsuarioOut,
} from "../../database/repositories/interfaces/IUsuarioRepository";

@injectable()
export class UsuarioLerUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (): Promise<IUsuarioOut[]> => {
    return await this._repo.ler();
  };
}
