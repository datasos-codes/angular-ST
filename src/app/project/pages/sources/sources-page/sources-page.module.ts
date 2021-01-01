import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../theme/shared/shared.module';
import { SourcesPageRoutingModule } from './sources-page-routing.module';
import { SourcesPageComponent } from './sources-page.component';
import { TableModule } from 'primeng/table';
import { NgbButtonsModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { EditSourceModule } from '../edit-source/edit-source.module';
import { EditchildsourceModule } from './../editchildsource/editchildsource.module';
import { DropdownModule } from 'primeng/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [SourcesPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    SourcesPageRoutingModule,
    TableModule,
    NgbButtonsModule,
    NgbTooltipModule,
    EditSourceModule,
    EditchildsourceModule,
    DropdownModule,
    NgxSpinnerModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class SourcesPageModule { }
