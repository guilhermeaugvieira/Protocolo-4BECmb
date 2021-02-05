import bcrypt from "bcrypt";

export class SistemaHash {
  constructor() {}

  gerar = (password: string): string => {
    return bcrypt.hashSync(password, parseInt(process.env.BCRYPY_SALTS));
  };

  comparar = (senha: string, senhaEncriptada: string): boolean => {
    return bcrypt.compareSync(senha, senhaEncriptada);
  };
}
