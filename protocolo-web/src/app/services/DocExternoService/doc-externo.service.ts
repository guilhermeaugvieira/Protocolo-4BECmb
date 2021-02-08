import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlApi } from '../../../environments/environment';
import { IDocExterno } from './interfaces/IDocExterno';

@Injectable({
  providedIn: 'root',
})
export class DocExternoService {
  constructor(private _http: HttpClient) {}

  obterNumeroRegistros(filtro?: string, valor?: string): Promise<number> {
    if (valor !== undefined) {
      const parametros = new HttpParams().set(filtro, valor);

      return this._http
        .get<number>(`${urlApi}doc_externo/lerQuantidade`, {
          params: parametros,
        })
        .toPromise();
    }

    return this._http
      .get<number>(`${urlApi}doc_externo/lerQuantidade`)
      .toPromise();
  }

  obterRegistros(
    filtro?: string,
    valor?: string,
    limit?: number,
    offset?: number
  ): Promise<IDocExterno[]> {
    if (valor !== undefined) {
      const parametros = new HttpParams()
        .set(filtro, valor)
        .set('Limit', limit.toString())
        .set('OffSet', offset.toString());

      return this._http
        .get<IDocExterno[]>(`${urlApi}doc_externo/ler`, {
          params: parametros,
        })
        .toPromise();
    } else {
      return this._http
        .get<IDocExterno[]>(`${urlApi}doc_externo/ler`)
        .toPromise();
    }
  }
}
