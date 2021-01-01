import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'scrapedelivery',
        loadChildren: () => import('./scrape-delivery/scrape-delivery.module').then(m => m.ScrapeDeliveryModule)
      },
      {
        path: 'overduesources',
        loadChildren: () => import('./overdue-sources/overdue-sources.module').then(m => m.OverdueSourcesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
