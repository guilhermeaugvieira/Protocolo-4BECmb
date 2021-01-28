import { Router } from "express";
import { UsuarioController } from "../useCases/Usuarios/Usuario.Controller";

const rotasUsuario = Router();
const controllerUsuario = new UsuarioController();

rotasUsuario.post("/usuario/adicionar", controllerUsuario.adicionarUsuario);
rotasUsuario.delete("/usuario/remover/:id", controllerUsuario.removerUsuario);
rotasUsuario.get("/usuarios/ler", controllerUsuario.lerUsuarios);
rotasUsuario.put("/usuario/atualizar/:id", controllerUsuario.atualizarUsuario);
rotasUsuario.get("/usuario/lerPorId/:id", controllerUsuario.lerPorId);
rotasUsuario.get("/usuario/verificarAcesso", controllerUsuario.verificarAcesso);

export { rotasUsuario };
