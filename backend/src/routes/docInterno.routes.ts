import { Router } from "express";
import { DocInternoController } from "../useCases/DocInterno/controllers/DocInterno.Controller";
import { autenticacaoMiddleWare } from "./middlewares/authenticacao.middleware";

const rotasDocInterno = Router();
const controllerDocInterno = new DocInternoController();

rotasDocInterno.get(
  "/doc_interno/ler",
  autenticacaoMiddleWare,
  controllerDocInterno.lerDocumentos
);
rotasDocInterno.get(
  "/doc_interno/ler/:documentoID",
  autenticacaoMiddleWare,
  controllerDocInterno.lerDocumentoPorId
);
rotasDocInterno.post(
  "/doc_interno/adicionar",
  autenticacaoMiddleWare,
  controllerDocInterno.adicionar
);
rotasDocInterno.delete(
  "/doc_interno/remover/:documentoId",
  autenticacaoMiddleWare,
  controllerDocInterno.remover
);
rotasDocInterno.put(
  "/doc_interno/atualizar/:documentoId",
  autenticacaoMiddleWare,
  controllerDocInterno.atualizar
);
rotasDocInterno.get(
  "/doc_interno/procurar/:parametro/:valor",
  autenticacaoMiddleWare,
  controllerDocInterno.procurar
);

export { rotasDocInterno };
