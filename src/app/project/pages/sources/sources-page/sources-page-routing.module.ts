import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SourcesPageComponent } from './sources-page.component';

const routes: Routes = [{ path: '', component: SourcesPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourcesPageRoutingModule { }
