import { container } from "tsyringe";

//Repositórios para serem injetados
import { UsuarioRepository } from "../../database/repositories/implementation/UsuarioRepository";
import { IUsuarioRepository } from "../../database/repositories/interfaces/IUsuarioRepository";

//Injeções
container.registerInstance<IUsuarioRepository>(
  "UsuarioRepository",
  new UsuarioRepository()
);
