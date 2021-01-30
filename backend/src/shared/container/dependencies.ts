import { container } from "tsyringe";

//Repositórios para serem injetados
import { UsuarioRepository } from "../../database/repositories/implementation/UsuarioRepository";
import { DocExternoRepository } from "../../database/repositories/implementation/DocExternoRepository";
import { DocInternoRepository } from "../../database/repositories/implementation/DocInternoRepository";
import { IDocRepository } from "../../database/repositories/interfaces/IDocRepository";
import { IUsuarioRepository } from "../../database/repositories/interfaces/IUsuarioRepository";

//Injeções
container.registerInstance<IUsuarioRepository>(
  "UsuarioRepository",
  new UsuarioRepository()
);

container.registerInstance<IDocRepository>(
  "DocExternoRepository",
  new DocExternoRepository()
);

container.registerInstance<IDocRepository>(
  "DocInternoRepository",
  new DocInternoRepository()
);
