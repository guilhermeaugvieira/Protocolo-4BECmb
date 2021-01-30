import { container, inject, injectable } from "tsyringe";
import { UsuarioRepository } from "../../database/repositories/implementation/UsuarioRepository";
import {
  IUsuarioRepository,
  IUsuarioOut,
  IUsuarioAdicionarIn,
} from "../../database/repositories/interfaces/IUsuarioRepository";

@injectable()
export class UsuarioAdicionarUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (
    usuarioRecebido: IUsuarioAdicionarIn
  ): Promise<IUsuarioOut> => {
    return await this._repo.adicionar(usuarioRecebido);
  };
}
