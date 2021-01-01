import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverdueSourcesComponent } from './overdue-sources.component';

const routes: Routes = [{ path: '', component: OverdueSourcesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverdueSourcesRoutingModule { }
