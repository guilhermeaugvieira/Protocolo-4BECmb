import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocInternoRoutingModule } from './doc-interno-routing.module';
import { DocInternoComponent } from './doc-interno.component';


@NgModule({
  declarations: [DocInternoComponent],
  imports: [
    CommonModule,
    DocInternoRoutingModule
  ]
})
export class DocInternoModule { }
