import { SharedModule } from './../../../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropErrorsRoutingModule } from './drag-drop-errors-routing.module';
import { DragDropErrorsComponent } from './drag-drop-errors.component';
import { DirectivesModule } from '../../../directive/directives.module';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [DragDropErrorsComponent],
  imports: [
    CommonModule,
    DragDropErrorsRoutingModule,
    SharedModule,
    DirectivesModule,
    DynamicDialogModule
  ],
  providers: [DialogService],
  exports: [DragDropErrorsComponent]
})
export class DragDropErrorsModule { }
