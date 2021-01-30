import { inject, injectable } from "tsyringe";
import {
  IUsuarioAcessoIn,
  IUsuarioOut,
  IUsuarioRepository,
} from "../../database/repositories/interfaces/IUsuarioRepository";

@injectable()
export class UsuarioVericarAcessoUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (usuario: IUsuarioAcessoIn): Promise<IUsuarioOut> => {
    return await this._repo.verificarAcesso(usuario);
  };
}
