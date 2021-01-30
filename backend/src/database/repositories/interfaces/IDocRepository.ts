export interface IDocOut {
  id: number;
  especificacao: string;
  dataDocumento: string;
  procedencia: string;
  dataRecebimento: string;
  nrProtocolo: string;
  assunto: string;
  destino1: string;
  destino2: string;
  destino3: string;
}

export interface IDocIn {
  especificacao: string;
  dataDocumento: string;
  procedencia: string;
  dataRecebimento: string;
  nrProtocolo: string;
  assunto: string;
  destino1: string;
  destino2: string;
  destino3: string;
}

export interface IDocFiltro {
  parametro: string;
  valor: string;
}

export interface IDocRepository {
  ler(): Promise<IDocOut[]>;

  lerPorId(documentoId: string): Promise<IDocOut>;

  adicionar(documentoRecebido: IDocIn): Promise<IDocOut>;

  remover(documentoId: string): Promise<boolean>;

  atualizar(documentoRecebido: IDocOut): Promise<boolean>;

  procurar(filtro: IDocFiltro): Promise<IDocOut[]>;
}
