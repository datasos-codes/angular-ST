import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DragDropErrorsComponent } from './drag-drop-errors.component';

const routes: Routes = [{ path: '', component: DragDropErrorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DragDropErrorsRoutingModule { }
