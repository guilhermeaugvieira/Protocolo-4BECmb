export interface IUsuarioAdicionarIn {
  nome: string;
  login: string;
  senha: string;
}

export interface IUsuarioOut {
  nome: string;
  login: string;
  senha: string;
  id: number;
}

export interface IUsuarioAtualizarIn {
  nome: string;
  senha: string;
  id: string;
}

export interface IUsuarioAcessoIn {
  login: string;
  senha: string;
}

export interface IUsuarioRepository {
  adicionar(usuarioRecebido: IUsuarioAdicionarIn): Promise<boolean>;

  remover(usuarioId: string): Promise<boolean>;

  ler(): Promise<IUsuarioOut[]>;

  atualizar(usuarioRecebido: IUsuarioAtualizarIn): Promise<boolean>;
}
