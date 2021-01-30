import { Router } from "express";
import { rotasDocExterno } from "./routes/docExterno.routes";
import { rotasDocInterno } from "./routes/docInterno.routes";
import { rotasUsuario } from "./routes/usuarios.routes";

const rotas = Router();

rotas.use(rotasUsuario);
rotas.use(rotasDocExterno);
rotas.use(rotasDocInterno);

export { rotas };
