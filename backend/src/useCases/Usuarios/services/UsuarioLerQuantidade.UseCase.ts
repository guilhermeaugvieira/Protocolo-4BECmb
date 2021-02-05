import { inject, injectable } from "tsyringe";
import {
  IUsuarioRepository,
  IUsuarioOut,
  IUsuarioFiltroQuantidade,
} from "../../../database/repositories/interfaces/IUsuarioRepository";

@injectable()
export class UsuarioLerQuantidadeUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (filtro: IUsuarioFiltroQuantidade): Promise<number> => {
    return await this._repo.lerQuantidade(filtro);
  };
}
