import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DocExternoService } from 'src/app/services/DocExternoService/doc-externo.service';
import { IDocExterno } from 'src/app/services/DocExternoService/interfaces/IDocExterno';
import { ISelectOption } from '../../../shared/interfaces/materialData';

@Component({
  selector: 'app-doc-externo',
  templateUrl: './doc-externo.component.html',
  styleUrls: ['./doc-externo.component.scss'],
})
export class DocExternoComponent implements OnInit {
  numeroRegistros: number;
  numeroPaginas: number;
  opcoesFiltro: ISelectOption[];
  formGrp: FormGroup;
  registros: IDocExterno[];
  opcoesPaginacao: number[];

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
        valor: 'Destino',
        valorVisualizado: 'Destino',
      },
    ];

    this.opcoesPaginacao = [10, 25, 50, 100];

    this.formGrp = this._FormBuilder.group({
      filtro: new FormControl(''),
      resposta: new FormControl(''),
      paginacao: new FormControl(10),
      numeroPagina: new FormControl(1),
    });
  }

  ngOnInit(): void {
    this._DocExternoService.obterNumeroRegistros().then((dados) => {
      this.numeroRegistros = dados;
      console.log(this.numeroRegistros);
    });

    this._DocExternoService.obterRegistros().then((dados) => {
      this.registros = dados;
      console.log(this.registros);
    });
  }

  search() {
    let offset =
      this.formGrp.controls.paginacao.value *
      (this.formGrp.controls.numeroPagina.value - 1);

    this._DocExternoService
      .obterNumeroRegistros(
        this.formGrp.controls.filtro.value,
        this.formGrp.controls.resposta.value
      )
      .then((quantidadeRegistros) => {
        this.numeroRegistros = quantidadeRegistros;

        this.numeroPaginas = Math.ceil(
          this.numeroRegistros / this.formGrp.controls.paginacao.value
        );

        console.log(this.numeroRegistros);
        console.log(this.numeroPaginas);
      });

    this._DocExternoService
      .obterRegistros(
        this.formGrp.controls.filtro.value,
        this.formGrp.controls.resposta.value,
        this.formGrp.controls.paginacao.value,
        offset
      )
      .then((dados) => {
        console.log(dados);
      });
  }
}
