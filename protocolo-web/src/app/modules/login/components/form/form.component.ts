import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/services/UserService/interfaces/IUsuario';
import { UserService } from 'src/app/services/UserService/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  formGrp: FormGroup;

  constructor(
    private _userService: UserService,
    private _formBuiler: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formGrp = this._formBuiler.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login = () => {
    const acesso: IUsuario = {
      login: this.formGrp.value.userName,
      senha: this.formGrp.value.password,
    };

    this._userService.login(acesso).then((dados) => {
      if (dados !== 'Usuário não encontrado') {
        localStorage.setItem('USERTOKEN', dados);
        this._router.navigateByUrl('/home');
      } else {
        this.openSnackBar('Login Incorreto');
      }
    });
  };

  openSnackBar = (mensagem: string) => {
    this._snackBar.open(mensagem, 'X', {
      duration: 3000,
    });
  };
}
