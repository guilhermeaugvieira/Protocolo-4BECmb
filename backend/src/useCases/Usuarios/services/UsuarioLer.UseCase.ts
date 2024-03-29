import { inject, injectable } from "tsyringe";
import {
  IUsuarioRepository,
  IUsuarioOut,
  IUsuarioFiltroDados,
} from "../../../database/repositories/interfaces/IUsuarioRepository";

@injectable()
export class UsuarioLerUseCase {
  constructor(@inject("UsuarioRepository") private _repo: IUsuarioRepository) {}

  execute = async (filtro: IUsuarioFiltroDados): Promise<IUsuarioOut[]> => {
    return await this._repo.ler(filtro);
  };
}
