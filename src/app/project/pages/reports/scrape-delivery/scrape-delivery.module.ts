import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from './../../../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ScrapeDeliveryRoutingModule } from './scrape-delivery-routing.module';
import { ScrapeDeliveryComponent } from './scrape-delivery.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TableModule } from 'primeng/table';
import { ShowSmmaryModule } from '../show-smmary/show-smmary.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [ScrapeDeliveryComponent],
  imports: [
    CommonModule,
    SharedModule,
    ScrapeDeliveryRoutingModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    TableModule,
    ShowSmmaryModule,
    NgbTooltipModule,
    InputTextModule
  ],
  providers: [DatePipe]
})
export class ScrapeDeliveryModule { }
