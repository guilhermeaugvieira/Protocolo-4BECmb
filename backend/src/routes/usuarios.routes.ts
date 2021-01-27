import { Router } from "express";
import { UsuarioController } from "../useCases/Usuarios/Usuario.Controller";

const rotasUsuario = Router();
const controllerUsuario = new UsuarioController();

rotasUsuario.post("/usuario/adicionar", controllerUsuario.adicionarUsuario);
rotasUsuario.delete("/usuario/remover/:id", controllerUsuario.removerUsuario);
rotasUsuario.get("/usuarios", controllerUsuario.lerUsuarios);
rotasUsuario.put("/usuario/atualizar/:id", controllerUsuario.atualizarUsuario);

export { rotasUsuario };
