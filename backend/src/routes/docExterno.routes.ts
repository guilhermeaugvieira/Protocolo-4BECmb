import { Router } from "express";
import { DocExternoController } from "../useCases/DocExterno/controllers/DocExterno.Controller";

const rotasDocExterno = Router();
const controllerDocExterno = new DocExternoController();

rotasDocExterno.get("/doc_externo/ler", controllerDocExterno.lerDocumentos);
rotasDocExterno.get(
  "/doc_externo/ler/:documentoID",
  controllerDocExterno.lerDocumentoPorId
);
rotasDocExterno.post("/doc_externo/adicionar", controllerDocExterno.adicionar);
rotasDocExterno.delete(
  "/doc_externo/remover/:documentoId",
  controllerDocExterno.remover
);
rotasDocExterno.put(
  "/doc_externo/atualizar/:documentoId",
  controllerDocExterno.atualizar
);
rotasDocExterno.get(
  "/doc_externo/procurar/:parametro/:valor",
  controllerDocExterno.procurar
);

export { rotasDocExterno };
