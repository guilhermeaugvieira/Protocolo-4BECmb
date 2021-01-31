import { inject, injectable } from "tsyringe";
import {
  IDocRepository,
  IDocOut,
} from "../../../database/repositories/interfaces/IDocRepository";

@injectable()
export class DocInternoLerPorIdUseCase {
  constructor(@inject("DocInternoRepository") private _repo: IDocRepository) {}

  execute = async (documentoID: string): Promise<IDocOut> => {
    return this._repo.lerPorId(documentoID);
  };
}
