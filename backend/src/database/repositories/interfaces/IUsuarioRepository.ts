export interface IUsuarioAdicionarIn {
  nome: string;
  login: string;
  senha: string;
}

export interface IUsuarioAdicionarOut {
  nome: string;
  login: string;
  senha: string;
  id: number;
}

export interface IUsuarioRepository {
  adicionar(
    usuarioRecebido: IUsuarioAdicionarIn
  ): Promise<IUsuarioAdicionarOut>;

  remover(usuarioId: string): Promise<boolean>;
}
