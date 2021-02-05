import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocExternoComponent } from './doc-externo.component';

const routes: Routes = [{ path: '', component: DocExternoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocExternoRoutingModule { }
