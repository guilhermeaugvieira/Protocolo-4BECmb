import { inject, injectable } from "tsyringe";
import {
  IDocRepository,
  IDocOut,
} from "../../database/repositories/interfaces/IDocRepository";

@injectable()
export class DocExternoLerPorIdUseCase {
  constructor(@inject("DocExternoRepository") private _repo: IDocRepository) {}

  execute = async (documentoID: string): Promise<IDocOut> => {
    return this._repo.lerPorId(documentoID);
  };
}
