import express, { Request, Response } from "express";
import { rotas } from "./config.routes";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(rotas);

server.get("/", (requisicao: Request, resposta: Response) => {
  resposta.send("Deu certo");
});

export { server };
