import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocInternoComponent } from './doc-interno.component';

const routes: Routes = [{ path: '', component: DocInternoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocInternoRoutingModule { }
