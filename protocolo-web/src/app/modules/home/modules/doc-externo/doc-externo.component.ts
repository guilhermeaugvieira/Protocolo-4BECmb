import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DocExternoService } from 'src/app/services/DocExternoService/doc-externo.service';
import { ISelectOption } from '../../../shared/interfaces/materialData';

@Component({
  selector: 'app-doc-externo',
  templateUrl: './doc-externo.component.html',
  styleUrls: ['./doc-externo.component.scss'],
})
export class DocExternoComponent implements OnInit {
  numeroRegistros: number;
  opcoesFiltro: ISelectOption[];
  formGrp: FormGroup;

  constructor(
    private _DocExternoService: DocExternoService,
    private _FormBuilder: FormBuilder
  ) {
    this.opcoesFiltro = [
      {
        valor: 'Assunto',
        valorVisualizado: 'Assunto',
      },
      {
        valor: 'Datadocumento',
        valorVisualizado: 'Data do documento',
      },
      {
        valor: 'Datarecebimento',
        valorVisualizado: 'Data de recebimento',
      },
      {
        valor: 'Procedencia',
        valorVisualizado: 'Procedência',
      },
      {
        valor: 'Nrprotocolo',
        valorVisualizado: 'Número Protocolo',
      },
      {
        valor: 'especificacao',
        valorVisualizado: 'Especificação',
      },
      {
        valor: 'Destino1',
        valorVisualizado: 'Destino1',
      },
      {
        valor: 'Destino2',
        valorVisualizado: 'Destino2',
      },
      {
        valor: 'Destino3',
        valorVisualizado: 'Destino3',
      },
    ];

    this.formGrp = this._FormBuilder.group({
      filtro: new FormControl(''),
      resposta: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this._DocExternoService.obterNumeroRegistros().then((dados) => {
      this.numeroRegistros = dados;
    });
  }
}
