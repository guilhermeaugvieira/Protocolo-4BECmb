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

export interface IUsuarioFiltroDados {
  ID?: number;
  Nome?: string;
  Login?: string;
  Senha?: string;
  OffSet?: number;
  Limit?: number;
}

export interface IUsuarioFiltroQuantidade {
  ID?: number;
  Nome?: string;
  Login?: string;
  Senha?: string;
}

export interface IUsuarioRepository {
  adicionar(usuarioRecebido: IUsuarioAdicionarIn): Promise<boolean>;

  remover(usuarioId: string): Promise<boolean>;

  ler(filtro: IUsuarioFiltroDados): Promise<IUsuarioOut[]>;

  lerQuantidade(fitro: IUsuarioFiltroQuantidade): Promise<number>;

  atualizar(usuarioRecebido: IUsuarioAtualizarIn): Promise<boolean>;
}
