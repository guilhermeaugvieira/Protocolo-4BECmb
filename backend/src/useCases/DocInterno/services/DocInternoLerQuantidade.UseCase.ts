import { inject, injectable } from "tsyringe";
import {
  IDocFiltroQuantidade,
  IDocRepository,
} from "../../../database/repositories/interfaces/IDocRepository";

@injectable()
export class DocInternoLerQuantidadeUseCase {
  constructor(@inject("DocInternoRepository") private _repo: IDocRepository) {}

  execute = async (filtro: IDocFiltroQuantidade): Promise<number> => {
    return await this._repo.lerQuantidade(filtro);
  };
}
