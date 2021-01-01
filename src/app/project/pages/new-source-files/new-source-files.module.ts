import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../theme/shared/shared.module';
import { NewSourceFilesRoutingModule } from './new-source-files-routing.module';
import { NewSourceFilesComponent } from './new-source-files.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { NgxFileDropModule } from 'ngx-file-drop';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropErrorsModule } from '../other/drag-drop-errors/drag-drop-errors.module';

@NgModule({
  declarations: [NewSourceFilesComponent],
  imports: [
    CommonModule,
    NewSourceFilesRoutingModule,
    SharedModule,
    InputNumberModule,
    DropdownModule,
    NgxFileDropModule,
    InputTextModule,
    InputTextareaModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    NgbTooltipModule,
    NgbPopoverModule,
    DragDropErrorsModule
  ],
  providers: [DatePipe]
})
export class NewSourceFilesModule { }
