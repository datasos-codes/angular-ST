import { DirectivesModule } from './../../../directive/directives.module';
import { SharedModule } from './../../../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditSourceRoutingModule } from './edit-source-routing.module';
import { EditSourceComponent } from './edit-source.component';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [EditSourceComponent],
  imports: [
    CommonModule,
    EditSourceRoutingModule,
    SharedModule,
    DropdownModule,
    DynamicDialogModule,
    DirectivesModule
  ],
  exports: [EditSourceComponent],
  providers: [
    DialogService
  ]
})
export class EditSourceModule { }
