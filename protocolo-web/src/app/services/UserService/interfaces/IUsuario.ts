export interface IUsuario {
  login: string;
  senha: string;
}

export interface IUsuarioAtualizar {
  nome: string;
  senha: string;
}

export interface IUsuarioAtualizarDados {
  senhaAtual: string;
  senhaNova: string;
  nome: string;
}
