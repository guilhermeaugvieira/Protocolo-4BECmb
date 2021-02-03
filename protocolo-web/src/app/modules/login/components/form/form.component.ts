import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
    private _formBuiler: FormBuilder
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
      console.log(dados);
      localStorage.setItem('USERTOKEN', dados);
    });
  };
}
