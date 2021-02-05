import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import {
  EnumTokenUsuario,
  UserService,
} from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  nomeUsuario: string;
  events: string[] = [];
  opened: boolean;

  constructor(private _router: Router, private _UserService: UserService) {}

  ngOnInit(): void {
    if (this._UserService.verificaTokenUsuario() !== EnumTokenUsuario.logado)
      this._router.navigateByUrl('/login');

    const token = localStorage.getItem('USERTOKEN');

    this.nomeUsuario = (<any>jwtDecode(token)).nome;
  }

  logout(): void {
    localStorage.clear();
    this._router.navigateByUrl('/login');
  }
}
