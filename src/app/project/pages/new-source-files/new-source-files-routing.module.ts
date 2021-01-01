import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSourceFilesComponent } from './new-source-files.component';

const routes: Routes = [
  { path: '', component: NewSourceFilesComponent },
  {
    path: 'drag-drop-errors',
    loadChildren: () => import('../other/drag-drop-errors/drag-drop-errors.module').then(m => m.DragDropErrorsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewSourceFilesRoutingModule { }
