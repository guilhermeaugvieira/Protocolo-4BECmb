import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'docExterno',
        loadChildren: () =>
          import('./modules/doc-externo/doc-externo.module').then(
            (m) => m.DocExternoModule
          ),
      },
      {
        path: 'docInterno',
        loadChildren: () =>
          import('./modules/doc-interno/doc-interno.module').then(
            (m) => m.DocInternoModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
