import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import jwtdecode from "jwt-decode";

const autenticacaoMiddleWare = (
  requisicao: Request,
  resposta: Response,
  next: NextFunction
) => {
  if (!(<string>requisicao.headers.authorization))
    return resposta.status(401).json("Token não foi provido");

  let token = <string>requisicao.headers.authorization.split(" ")[1];

  jsonwebtoken.verify(token, process.env.APP_SECRET, (erro: any) => {
    if (erro) return resposta.json("Assinatura inválida");
  });

  if ((<any>jwtdecode(token)).exp * 1000 < Date.now()) {
    return resposta.json("Token expirado");
  }

  next();
};

export { autenticacaoMiddleWare };
