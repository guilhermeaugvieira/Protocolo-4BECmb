import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDoc } from '../../interfaces/IDoc';

@Component({
  selector: 'app-excluir-documento',
  templateUrl: './excluir-documento.component.html',
  styleUrls: ['./excluir-documento.component.scss'],
})
export class ExcluirDocumentoComponent implements OnInit {
  constructor(
    public _Dialog: MatDialogRef<ExcluirDocumentoComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any
  ) {}

  ngOnInit(): void {}
}
