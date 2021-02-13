import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUsuarioAtualizarDados } from '../../../../services/UserService/interfaces/IUsuario';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {
  formGrp: FormGroup;

  constructor(
    public _Dialog: MatDialogRef<EditarUsuarioComponent>,
    private _formBuiler: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public _data: any
  ) {}

  ngOnInit(): void {
    this.formGrp = this._formBuiler.group({
      senhaAtual: new FormControl('', [Validators.required]),
      nome: new FormControl(''),
      senhaNova: new FormControl(''),
      confirmacaoSenha: new FormControl(''),
    });
  }

  prepararDados(): void {
    const dadosAtualizar: IUsuarioAtualizarDados = {
      nome: this.formGrp.controls.nome.value,
      senhaAtual: this.formGrp.controls.senhaAtual.value,
      senhaNova: this.formGrp.controls.senhaNova.value,
    };

    this._Dialog.close(dadosAtualizar);
  }
}
