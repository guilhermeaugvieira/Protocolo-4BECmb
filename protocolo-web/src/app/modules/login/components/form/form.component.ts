import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
    this._userService.login(this.formGrp);
  };
}
