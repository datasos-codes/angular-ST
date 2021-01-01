import { AddeditirregularsourcenamesModule } from './addeditirregularsourcenames/addeditirregularsourcenames.module';
import { SharedModule } from './../../../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IrregularsourcenamesRoutingModule } from './irregularsourcenames-routing.module';
import { IrregularsourcenamesComponent } from './irregularsourcenames.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TableModule } from 'primeng/table';
import { NgbButtonsModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [IrregularsourcenamesComponent],
  imports: [
    CommonModule,
    SharedModule,
    IrregularsourcenamesRoutingModule,
    NgxSpinnerModule,
    TableModule,
    NgbButtonsModule,
    NgbTooltipModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
    AddeditirregularsourcenamesModule,
    DialogModule
  ],
  providers: [
    MessageService
  ]
})
export class IrregularsourcenamesModule { }
