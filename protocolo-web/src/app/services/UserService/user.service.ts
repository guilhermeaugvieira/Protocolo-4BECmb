import { Injectable } from '@angular/core';
import { IUsuario } from './interfaces/IUsuario';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: IUsuario;

  constructor() {}

  login = (form: FormGroup) => {
    console.log(form);
  };
}
