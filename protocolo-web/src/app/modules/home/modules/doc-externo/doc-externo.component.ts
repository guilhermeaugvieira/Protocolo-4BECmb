import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExcluirDocumentoComponent } from '../../../shared/components/excluir-documento/excluir-documento.component';
import { RegistrarDocumentoComponent } from '../../../shared/components/registrar-documento/registrar-documento.component';
import { EditarDocumentoComponent } from '../../../shared/components/editar-documento/editar-documento.component';
import { DocExternoService } from '../../../../services/DocExternoService/doc-externo.service';
import { IDoc } from '../../../shared/interfaces/IDoc';
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
  registros: IDoc[];
  opcoesPaginacao: number[];

  constructor(
    private _DocExternoService: DocExternoService,
    private _FormBuilder: FormBuilder,
    private _MatDialog: MatDialog,
    private _snackBar: MatSnackBar
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
    this.formGrp.controls.numeroPagina.setValue(1);

    this._DocExternoService
      .obterNumeroRegistros()
      .then((quantidadeRegistros) => {
        this.numeroRegistros = quantidadeRegistros;

        this.numeroPaginas = Math.ceil(
          this.numeroRegistros / this.formGrp.controls.paginacao.value
        );
      });

    this._DocExternoService
      .obterRegistros(
        this.formGrp.controls.filtro.value,
        this.formGrp.controls.resposta.value,
        this.formGrp.controls.paginacao.value,
        0
      )
      .then((dados) => {
        this.registros = dados;
      });
  }

  search() {
    this.formGrp.controls.numeroPagina.setValue(1);

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
      });

    this._DocExternoService
      .obterRegistros(
        this.formGrp.controls.filtro.value,
        this.formGrp.controls.resposta.value,
        this.formGrp.controls.paginacao.value,
        0
      )
      .then((dados) => {
        this.registros = dados;
      });
  }

  goToPage(option: string): void {
    switch (option) {
      case 'last':
        this.formGrp.controls.numeroPagina.setValue(this.numeroPaginas);
        break;
      case 'first':
        this.formGrp.controls.numeroPagina.setValue(1);
        break;
      case 'right':
        this.formGrp.controls.numeroPagina.setValue(
          this.formGrp.controls.numeroPagina.value + 1
        );
        break;
      case 'left':
        this.formGrp.controls.numeroPagina.setValue(
          this.formGrp.controls.numeroPagina.value - 1
        );
        break;
    }

    this._DocExternoService
      .obterRegistros(
        this.formGrp.controls.filtro.value,
        this.formGrp.controls.resposta.value,
        this.formGrp.controls.paginacao.value,
        this.formGrp.controls.paginacao.value *
          (this.formGrp.controls.numeroPagina.value - 1)
      )
      .then((dados) => {
        this.registros = dados;
      });
  }

  changePagination(pagination: number): void {
    this.formGrp.controls.numeroPagina.setValue(1);

    this.numeroPaginas = Math.ceil(
      this.numeroRegistros / this.formGrp.controls.paginacao.value
    );

    this._DocExternoService
      .obterRegistros(
        this.formGrp.controls.filtro.value,
        this.formGrp.controls.resposta.value,
        this.formGrp.controls.paginacao.value,
        0
      )
      .then((dados) => {
        this.registros = dados;
      });
  }

  adicionarDocumento(): void {
    const dialogRef = this._MatDialog.open(RegistrarDocumentoComponent, {
      role: 'dialog',
      height: '580px',
      width: '480px',
    });

    dialogRef.afterClosed().subscribe((documento) => {
      if (documento !== undefined) {
        this._DocExternoService
          .adicionarRegistro(documento)
          .then((resposta) => {
            if (resposta === true) {
              this.search();

              this.openSnackBar('Documento adicionado com sucesso');
            } else {
              this.openSnackBar('Não foi possivel registrar o novo documento');
            }
          });
      } else {
        this.openSnackBar('Registro cancelado pelo usuário');
      }
    });
  }

  excluirDocumento(documento: IDoc): void {
    const dialogRef = this._MatDialog.open(ExcluirDocumentoComponent, {
      role: 'dialog',
      data: {
        documento: documento,
      },
    });

    dialogRef.afterClosed().subscribe((resposta) => {
      if (resposta !== undefined) {
        if (resposta === true) {
          this._DocExternoService
            .removerRegistro(documento.id.toString())
            .then((resposta) => {
              if (resposta === true) {
                this.search();
                this.openSnackBar('Documento removido com sucesso');
              } else {
                this.openSnackBar('Não foi possivel remover o documento');
              }
            });
        }
      } else {
        this.openSnackBar('Operação cancelada pelo usuário');
      }
    });
  }

  editarDocumento(documento: IDoc): void {
    const { id, ...dadosDocumento } = documento;

    const dialogRef = this._MatDialog.open(EditarDocumentoComponent, {
      role: 'dialog',
      height: '580px',
      width: '480px',
      data: {
        documento: dadosDocumento,
      },
    });

    dialogRef.afterClosed().subscribe((documento) => {
      if (documento !== undefined) {
        this._DocExternoService
          .atualizarRegistro(id, documento)
          .then((resposta) => {
            if (resposta === true) {
              this.search();
              this.openSnackBar('Documento atualizado com sucesso');
            } else {
              this.openSnackBar('Não foi possivel atualizar o documento');
            }
          });
      } else {
        this.openSnackBar('Operação cancelada pelo usuário');
      }
    });
  }

  openSnackBar = (mensagem: string) => {
    this._snackBar.open(mensagem, 'X', {
      duration: 3000,
    });
  };
}
