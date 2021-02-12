import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocInternoRoutingModule } from './doc-interno-routing.module';
import { DocInternoComponent } from './doc-interno.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [DocInternoComponent],
  imports: [
    CommonModule,
    DocInternoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
})
export class DocInternoModule {}
