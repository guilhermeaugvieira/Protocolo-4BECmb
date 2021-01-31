import { inject, injectable } from "tsyringe";
import {
  IDocOut,
  IDocRepository,
} from "../../../database/repositories/interfaces/IDocRepository";

@injectable()
export class DocInternoLerUseCase {
  constructor(@inject("DocInternoRepository") private _repo: IDocRepository) {}

  execute = async (): Promise<IDocOut[]> => {
    return await this._repo.ler();
  };
}
