import { container, inject, injectable } from "tsyringe";
import { UsuarioRepository } from "../../database/repositories/implementation/UsuarioRepository";
import {
  IUsuarioRepository,
  IUsuarioAdicionarOut,
  IUsuarioAdicionarIn,
} from "../../database/repositories/interfaces/IUsuarioRepository";

@injectable()
export class UsuarioAdicionarUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (
    usuarioRecebido: IUsuarioAdicionarIn
  ): Promise<IUsuarioAdicionarOut> => {
    const _UsuarioRepository = container.resolve(UsuarioRepository);

    return await _UsuarioRepository.adicionar(usuarioRecebido);
  };
}
