import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDocAdd } from '../../interfaces/IDoc';

@Component({
  selector: 'app-editar-documento',
  templateUrl: './editar-documento.component.html',
  styleUrls: ['./editar-documento.component.scss'],
})
export class EditarDocumentoComponent implements OnInit {
  formGrp: FormGroup;

  constructor(
    public _Dialog: MatDialogRef<EditarDocumentoComponent>,
    private _formBuiler: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public _data: any
  ) {}

  ngOnInit(): void {
    this.formGrp = this._formBuiler.group({
      NrProtocolo: new FormControl(this._data.documento.nrProtocolo, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      Assunto: new FormControl(this._data.documento.assunto, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      Especificacao: new FormControl(this._data.documento.especificacao, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      DataDocumento: new FormControl(this._data.documento.dataDocumento, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      DataRecebimento: new FormControl(this._data.documento.dataRecebimento, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      Procedencia: new FormControl(this._data.documento.procedencia, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      Destino1: new FormControl(this._data.documento.destino1, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      Destino2: new FormControl(this._data.documento.destino2, [
        Validators.maxLength(100),
      ]),
      Destino3: new FormControl(this._data.documento.destino3, [
        Validators.maxLength(100),
      ]),
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
