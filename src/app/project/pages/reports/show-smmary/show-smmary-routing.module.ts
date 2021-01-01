import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowSmmaryComponent } from './show-smmary.component';

const routes: Routes = [{ path: '', component: ShowSmmaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowSmmaryRoutingModule { }
