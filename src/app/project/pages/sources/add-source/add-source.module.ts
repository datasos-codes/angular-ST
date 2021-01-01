import { DirectivesModule } from './../../../directive/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../theme/shared/shared.module';
import { AddSourceRoutingModule } from './add-source-routing.module';
import { AddSourceComponent, ViewStateSourcesDialogComponent } from './add-source.component';
import { NgxSpinnerModule } from 'ngx-spinner';

// PrimeNg
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { NgbButtonsModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AddSourceComponent, ViewStateSourcesDialogComponent],
  imports: [
    CommonModule,
    AddSourceRoutingModule,
    SharedModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    FileUploadModule,
    DynamicDialogModule,
    InputNumberModule,
    DialogModule,
    NgbButtonsModule,
    NgxSpinnerModule,
    DirectivesModule,
    NgbTooltipModule
  ],
  providers: [MessageService],
  entryComponents: [ViewStateSourcesDialogComponent]
})
export class AddSourceModule { }
