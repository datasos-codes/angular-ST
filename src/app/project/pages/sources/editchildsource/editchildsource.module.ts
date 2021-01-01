import { DirectivesModule } from './../../../directive/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EditchildsourceRoutingModule } from './editchildsource-routing.module';
import { EditchildsourceComponent } from './editchildsource.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [EditchildsourceComponent],
  imports: [
    CommonModule,
    EditchildsourceRoutingModule,
    SharedModule,
    DropdownModule,
    DynamicDialogModule,
    BsDatepickerModule.forRoot(),
    DirectivesModule
  ],
  exports: [EditchildsourceComponent],
  providers: [
    DialogService,
    DatePipe
  ]
})
export class EditchildsourceModule { }
