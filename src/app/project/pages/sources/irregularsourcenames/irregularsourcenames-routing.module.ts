import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IrregularsourcenamesComponent } from './irregularsourcenames.component';

const routes: Routes = [{ path: '', component: IrregularsourcenamesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IrregularsourcenamesRoutingModule { }
