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

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  formGrp: FormGroup;
  userName: FormControl;
  password: FormControl;

  constructor(
    private _userService: UserService,
    private _formBuiler: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.formGrp = this._formBuiler.group({
      userName: new FormControl(this.userName, [Validators.required]),
      password: new FormControl(this.password, [Validators.required]),
    });
  }

  login = () => {
    const acesso: IUsuario = {
      login: this.formGrp.value.userName,
      senha: this.formGrp.value.password,
    };

    this._userService.login(acesso).then((dados) => {
      localStorage.setItem('USERTOKEN', dados);
    });

    this._router.navigateByUrl('/home');
  };
}
