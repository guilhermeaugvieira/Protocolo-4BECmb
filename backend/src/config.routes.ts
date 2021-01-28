import { Router } from "express";
import { rotasDocExterno } from "./routes/docExterno.routes";
import { rotasUsuario } from "./routes/usuarios.routes";

const rotas = Router();

rotas.use(rotasUsuario);
rotas.use(rotasDocExterno);

export { rotas };
