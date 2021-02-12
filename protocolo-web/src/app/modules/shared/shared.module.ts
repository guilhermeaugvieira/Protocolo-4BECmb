import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistrarDocumentoComponent } from './components/registrar-documento/registrar-documento.component';
import { MatButtonModule } from '@angular/material/button';
import { ExcluirDocumentoComponent } from './components/excluir-documento/excluir-documento.component';
import { EditarDocumentoComponent } from './components/editar-documento/editar-documento.component';

@NgModule({
  declarations: [
    InputComponent,
    RegistrarDocumentoComponent,
    ExcluirDocumentoComponent,
    EditarDocumentoComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [InputComponent],
})
export class SharedModule {}
