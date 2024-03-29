import { Injectable } from '@angular/core';
import { IUsuario, IUsuarioAtualizar } from './interfaces/IUsuario';
import { HttpClient } from '@angular/common/http';
import { urlApi } from '../../../environments/environment';
import jwt from 'jwt-decode';

export enum EnumTokenUsuario {
  expirado,
  logado,
  naoLogado,
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(form: IUsuario) {
    return this.http.post<string>(`${urlApi}usuario/login`, form).toPromise();
  }

  verificaTokenUsuario(): EnumTokenUsuario {
    const token = localStorage.getItem('USERTOKEN');

    if (!token) return EnumTokenUsuario.naoLogado;

    if ((<any>jwt(token)).exp * 1000 > Date.now())
      return EnumTokenUsuario.logado;

    return EnumTokenUsuario.expirado;
  }

  getToken(): string {
    return localStorage.getItem('USERTOKEN');
  }

  atualizar(idUsuario: number, form: IUsuarioAtualizar) {
    return this.http
      .put<boolean>(`${urlApi}usuario/atualizar/${idUsuario}`, form)
      .toPromise();
  }
}
