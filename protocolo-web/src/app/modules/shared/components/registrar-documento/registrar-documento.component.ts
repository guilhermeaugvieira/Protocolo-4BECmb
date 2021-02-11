import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registrar-documento',
  templateUrl: './registrar-documento.component.html',
  styleUrls: ['./registrar-documento.component.scss'],
})
export class RegistrarDocumentoComponent implements OnInit {
  constructor(public _Dialog: MatDialogRef<RegistrarDocumentoComponent>) {}

  ngOnInit(): void {}
}
