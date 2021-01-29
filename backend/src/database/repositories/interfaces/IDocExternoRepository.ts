export interface IDocExternoOut {
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

export interface IDocExternoAdicionarIn {
  especificacao: string;
  dataDocumento: string;
  procedencia: string;
  dataRecebimento: string;
  nrProtocolo: string;
  assunto: string;
  destino1?: string;
  destino2?: string;
  destino3?: string;
}
