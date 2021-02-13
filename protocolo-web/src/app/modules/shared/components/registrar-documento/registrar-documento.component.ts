import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IDocAdd } from '../../interfaces/IDoc';

@Component({
  selector: 'app-registrar-documento',
  templateUrl: './registrar-documento.component.html',
  styleUrls: ['./registrar-documento.component.scss'],
})
export class RegistrarDocumentoComponent implements OnInit {
  formGrp: FormGroup;

  constructor(
    public _Dialog: MatDialogRef<RegistrarDocumentoComponent>,
    private _formBuiler: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGrp = this._formBuiler.group({
      NrProtocolo: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      Assunto: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      Especificacao: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
      DataDocumento: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      DataRecebimento: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      Procedencia: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      Destino1: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      Destino2: new FormControl('', [Validators.maxLength(100)]),
      Destino3: new FormControl('', [Validators.maxLength(100)]),
    });
  }

  prepararDados(): void {
    const documento: IDocAdd = {
      assunto: this.formGrp.value.Assunto,
      dataDocumento: this.formGrp.value.DataDocumento,
      dataRecebimento: this.formGrp.value.DataRecebimento,
      especificacao: this.formGrp.value.Especificacao,
      nrProtocolo: this.formGrp.value.NrProtocolo,
      procedencia: this.formGrp.value.Procedencia,
      destino1: this.formGrp.value.Destino1,
      destino2:
        this.formGrp.value.Destino2 !== ''
          ? this.formGrp.value.Destino2
          : undefined,
      destino3:
        this.formGrp.value.Destino3 !== ''
          ? this.formGrp.value.Destino3
          : undefined,
    };

    this._Dialog.close(documento);
  }
}
