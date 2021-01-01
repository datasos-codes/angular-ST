import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSourceComponent } from './add-source.component';

const routes: Routes = [{ path: '', component: AddSourceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddSourceRoutingModule { }
