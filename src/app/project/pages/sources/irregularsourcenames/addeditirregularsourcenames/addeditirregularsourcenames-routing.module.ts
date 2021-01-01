import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddeditirregularsourcenamesComponent } from './addeditirregularsourcenames.component';

const routes: Routes = [{ path: '', component: AddeditirregularsourcenamesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddeditirregularsourcenamesRoutingModule { }
