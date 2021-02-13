import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import {
  IUsuarioAtualizar,
  IUsuarioAtualizarDados,
  IUsuario,
} from 'src/app/services/UserService/interfaces/IUsuario';
import {
  EnumTokenUsuario,
  UserService,
} from 'src/app/services/UserService/user.service';
import { EditarUsuarioComponent } from '../shared/components/editar-usuario/editar-usuario.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  nomeUsuario: string;
  idUsuario: number;
  loginUsuario: string;

  constructor(
    private _router: Router,
    private _UserService: UserService,
    private _MatDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this._UserService.verificaTokenUsuario() !== EnumTokenUsuario.logado)
      this._router.navigateByUrl('/login');

    const token = localStorage.getItem('USERTOKEN');

    this.nomeUsuario = (<any>jwtDecode(token)).nome;
    this.idUsuario = (<any>jwtDecode(token)).id;
    this.loginUsuario = (<any>jwtDecode(token)).login;
  }

  logout(): void {
    localStorage.clear();
    this._router.navigateByUrl('/login');
  }

  atualizarDadosUsuario(): void {
    const dialogRef = this._MatDialog.open(EditarUsuarioComponent, {
      role: 'dialog',
      width: '380px',
      data: {
        idUsuario: this.idUsuario,
        loginUsuario: this.loginUsuario,
      },
    });

    dialogRef.afterClosed().subscribe((retorno) => {
      if (retorno !== undefined) {
        const dadosLogin: IUsuario = {
          login: this.loginUsuario,
          senha: (<IUsuarioAtualizarDados>retorno).senhaAtual,
        };

        this._UserService.login(dadosLogin).then((respostaLogin) => {
          if (respostaLogin !== 'Usuário não encontrado') {
            const dadosAtualizacao: IUsuarioAtualizar = {
              nome: (<IUsuarioAtualizarDados>retorno).nome,
              senha: (<IUsuarioAtualizarDados>retorno).senhaNova,
            };

            this._UserService
              .atualizar(this.idUsuario, dadosAtualizacao)
              .then((respostaAtualizacao) => {
                if (respostaAtualizacao === true) {
                  this.nomeUsuario = (<IUsuarioAtualizarDados>retorno).nome;
                  this.openSnackBar('Dados atualizados com sucesso');
                } else {
                  this.openSnackBar('Erro ao atualizar os dados');
                }
              });
          } else {
            this.openSnackBar('Senha digitada não confere');
          }
        });
      }
    });
  }

  openSnackBar = (mensagem: string) => {
    this._snackBar.open(mensagem, 'X', {
      duration: 3000,
    });
  };
}
