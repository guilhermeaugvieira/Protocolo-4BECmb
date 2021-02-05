import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlApi } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocExternoService {
  constructor(private _http: HttpClient) {}

  obterNumeroRegistros(): Promise<number> {
    return this._http
      .get<number>(`${urlApi}doc_externo/lerQuantidade`)
      .toPromise();
  }
}
