import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UserService,
  EnumTokenUsuario,
} from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private _UserService: UserService, private _router: Router) {}

  ngOnInit(): void {
    if (this._UserService.verificaTokenUsuario() === EnumTokenUsuario.logado)
      this._router.navigateByUrl('/home');
  }
}
