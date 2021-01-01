import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScrapeDeliveryComponent } from './scrape-delivery.component';

const routes: Routes = [
  {
    path: '',
    component: ScrapeDeliveryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrapeDeliveryRoutingModule { }
