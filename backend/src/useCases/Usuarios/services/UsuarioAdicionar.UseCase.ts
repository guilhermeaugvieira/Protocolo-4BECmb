import { inject, injectable } from "tsyringe";
import {
  IUsuarioRepository,
  IUsuarioAdicionarIn,
} from "../../../database/repositories/interfaces/IUsuarioRepository";
import { SistemaHash } from "../../../providers/BCrypt";

@injectable()
export class UsuarioAdicionarUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (usuarioRecebido: IUsuarioAdicionarIn): Promise<boolean> => {
    const hash = new SistemaHash().gerar(usuarioRecebido.senha);

    usuarioRecebido.senha = hash;

    return await this._repo.adicionar(usuarioRecebido);
  };
}
