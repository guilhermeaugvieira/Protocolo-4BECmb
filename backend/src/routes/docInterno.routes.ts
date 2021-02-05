import { Router } from "express";
import { DocInternoController } from "../useCases/DocInterno/controllers/DocInterno.Controller";

const rotasDocInterno = Router();
const controllerDocInterno = new DocInternoController();

rotasDocInterno.get("/doc_interno/ler", controllerDocInterno.lerDocumentos);
rotasDocInterno.post("/doc_interno/adicionar", controllerDocInterno.adicionar);
rotasDocInterno.delete(
  "/doc_interno/remover/:documentoId",
  controllerDocInterno.remover
);
rotasDocInterno.put(
  "/doc_interno/atualizar/:documentoId",
  controllerDocInterno.atualizar
);

export { rotasDocInterno };
