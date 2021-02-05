import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import jwtdecode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  nomeUsuario: string;
  events: string[] = [];
  opened: boolean;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('USERTOKEN');

    this.nomeUsuario = (<any>jwtDecode(token)).nome;
  }

  logout(): void {
    localStorage.clear();
    this._router.navigateByUrl('/login');
  }
}
