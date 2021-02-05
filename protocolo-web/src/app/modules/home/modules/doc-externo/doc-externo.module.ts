import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocExternoRoutingModule } from './doc-externo-routing.module';
import { DocExternoComponent } from './doc-externo.component';

@NgModule({
  declarations: [DocExternoComponent],
  imports: [CommonModule, DocExternoRoutingModule],
})
export class DocExternoModule {}
