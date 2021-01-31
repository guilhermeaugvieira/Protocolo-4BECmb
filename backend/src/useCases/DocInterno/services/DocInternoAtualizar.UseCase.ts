import { inject, injectable } from "tsyringe";
import {
  IDocOut,
  IDocRepository,
} from "../../../database/repositories/interfaces/IDocRepository";

@injectable()
export class DocInternoAtualizarUseCase {
  constructor(@inject("DocInternoRepository") private _repo: IDocRepository) {}

  execute = async (documento: IDocOut): Promise<boolean> => {
    return await this._repo.atualizar(documento);
  };
}
