import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditchildsourceComponent } from './editchildsource.component';

const routes: Routes = [{ path: '', component: EditchildsourceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditchildsourceRoutingModule { }
