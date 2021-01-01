import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSourceComponent } from './edit-source.component';

const routes: Routes = [{ path: '', component: EditSourceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditSourceRoutingModule { }
