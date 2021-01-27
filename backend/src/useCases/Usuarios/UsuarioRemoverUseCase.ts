import { container, inject, injectable } from "tsyringe";
import { UsuarioRepository } from "../../database/repositories/implementation/UsuarioRepository";
import { IUsuarioRepository } from "../../database/repositories/interfaces/IUsuarioRepository";

@injectable()
export class UsuarioRemoverUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (usuarioId: string): Promise<boolean> => {
    const _UsuarioRepository = container.resolve(UsuarioRepository);

    return await _UsuarioRepository.remover(usuarioId);
  };
}
