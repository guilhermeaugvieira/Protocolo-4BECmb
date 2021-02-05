import { Component, OnInit } from '@angular/core';
import { DocExternoService } from 'src/app/services/DocExternoService/doc-externo.service';

@Component({
  selector: 'app-doc-externo',
  templateUrl: './doc-externo.component.html',
  styleUrls: ['./doc-externo.component.scss'],
})
export class DocExternoComponent implements OnInit {
  numeroRegistros: number;

  constructor(private _DocExternoService: DocExternoService) {}

  ngOnInit(): void {
    this._DocExternoService.obterNumeroRegistros().then((dados) => {
      this.numeroRegistros = dados;

      console.log(this.numeroRegistros);
    });
  }
}
