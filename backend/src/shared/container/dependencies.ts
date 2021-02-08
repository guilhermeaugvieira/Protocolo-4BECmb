import { container } from "tsyringe";

//Repositórios para serem injetados
import { UsuarioRepository } from "../../database/repositories/implementation/UsuarioRepository";
import { DocExternoRepository } from "../../database/repositories/implementation/DocExternoRepository";
import { DocInternoRepository } from "../../database/repositories/implementation/DocInternoRepository";
import { IDocRepository } from "../../database/repositories/interfaces/IDocRepository";
import { IUsuarioRepository } from "../../database/repositories/interfaces/IUsuarioRepository";
import { IDatabase } from "../../providers/interfaces/IDatabase";
import { MySQL } from "../../providers/implementation/Database";

//Injeções

container.register<IDatabase>("Database", { useClass: MySQL });

container.register<IUsuarioRepository>("UsuarioRepository", {
  useClass: UsuarioRepository,
});

container.register<IDocRepository>("DocExternoRepository", {
  useClass: DocExternoRepository,
});

container.register<IDocRepository>("DocInternoRepository", {
  useClass: DocInternoRepository,
});
