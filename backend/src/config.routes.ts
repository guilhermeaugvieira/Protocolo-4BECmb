import { Router } from "express";
import { rotasUsuario } from "./routes/usuarios.routes";

const rotas = Router();

rotas.use(rotasUsuario);

export { rotas };
