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

export interface IDocFiltroDados {
  ID?: number;
  especificacao?: string;
  Datadocumento?: string;
  Procedencia?: string;
  Datarecebimento?: string;
  Nrprotocolo?: string;
  Assunto?: string;
  Destino1?: string;
  Destino2?: string;
  Destino3?: string;
  Limit?: number;
  OffSet?: number;
}

export interface IDocFiltroQuantidade {
  ID?: number;
  especificacao?: string;
  Datadocumento?: string;
  Procedencia?: string;
  Datarecebimento?: string;
  Nrprotocolo?: string;
  Assunto?: string;
  Destino1?: string;
  Destino2?: string;
  Destino3?: string;
}

export interface IDocRepository {
  ler(filtro: IDocFiltroDados): Promise<IDocOut[]>;

  lerQuantidade(filtro: IDocFiltroQuantidade): Promise<number>;

  adicionar(documentoRecebido: IDocIn): Promise<IDocOut>;

  remover(documentoId: string): Promise<boolean>;

  atualizar(documentoRecebido: IDocOut): Promise<boolean>;
}
