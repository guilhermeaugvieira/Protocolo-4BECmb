import { inject, injectable } from "tsyringe";
import {
  IDocFiltroDados,
  IDocOut,
  IDocRepository,
} from "../../../database/repositories/interfaces/IDocRepository";

@injectable()
export class DocInternoLerUseCase {
  constructor(@inject("DocInternoRepository") private _repo: IDocRepository) {}

  execute = async (filtro: IDocFiltroDados): Promise<IDocOut[]> => {
    return await this._repo.ler(filtro);
  };
}
