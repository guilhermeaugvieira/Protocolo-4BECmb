import { inject, injectable } from "tsyringe";
import {
  IDocFiltroQuantidade,
  IDocRepository,
} from "../../../database/repositories/interfaces/IDocRepository";

@injectable()
export class DocExternoLerQuantidadeUseCase {
  constructor(@inject("DocExternoRepository") private _repo: IDocRepository) {}

  execute = async (filtro: IDocFiltroQuantidade): Promise<number> => {
    return await this._repo.lerQuantidade(filtro);
  };
}
