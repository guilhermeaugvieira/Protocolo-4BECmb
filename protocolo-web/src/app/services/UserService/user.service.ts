import { Injectable } from '@angular/core';
import { IUsuario } from './interfaces/IUsuario';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: IUsuario;

  constructor() {}

  login = () => {};
}
