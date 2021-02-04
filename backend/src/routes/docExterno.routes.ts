import { Router } from "express";
import { DocExternoController } from "../useCases/DocExterno/controllers/DocExterno.Controller";
import { autenticacaoMiddleWare } from "./middlewares/authenticacao.middleware";

const rotasDocExterno = Router();
const controllerDocExterno = new DocExternoController();

rotasDocExterno.get(
  "/doc_externo/ler",
  autenticacaoMiddleWare,
  controllerDocExterno.lerDocumentos
);
rotasDocExterno.get(
  "/doc_externo/ler/:documentoID",
  autenticacaoMiddleWare,
  controllerDocExterno.lerDocumentoPorId
);
rotasDocExterno.post(
  "/doc_externo/adicionar",
  autenticacaoMiddleWare,
  controllerDocExterno.adicionar
);
rotasDocExterno.delete(
  "/doc_externo/remover/:documentoId",
  autenticacaoMiddleWare,
  controllerDocExterno.remover
);
rotasDocExterno.put(
  "/doc_externo/atualizar/:documentoId",
  autenticacaoMiddleWare,
  controllerDocExterno.atualizar
);
rotasDocExterno.get(
  "/doc_externo/procurar/:parametro/:valor",
  autenticacaoMiddleWare,
  controllerDocExterno.procurar
);

export { rotasDocExterno };
