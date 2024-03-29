import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocExternoRoutingModule } from './doc-externo-routing.module';
import { DocExternoComponent } from './doc-externo.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [DocExternoComponent],
  imports: [
    CommonModule,
    DocExternoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
})
export class DocExternoModule {}
