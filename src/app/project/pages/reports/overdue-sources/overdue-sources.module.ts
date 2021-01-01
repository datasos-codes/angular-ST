import { SharedModule } from './../../../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverdueSourcesRoutingModule } from './overdue-sources-routing.module';
import { OverdueSourcesComponent } from './overdue-sources.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [OverdueSourcesComponent],
  imports: [
    CommonModule,
    OverdueSourcesRoutingModule,
    NgxSpinnerModule,
    SharedModule,
    TableModule,
    InputTextModule,
    NgbTooltipModule
  ]
})
export class OverdueSourcesModule { }
