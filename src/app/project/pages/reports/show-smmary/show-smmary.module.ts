import { DirectivesModule } from './../../../directive/directives.module';
import { SharedModule } from './../../../../theme/shared/shared.module';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowSmmaryRoutingModule } from './show-smmary-routing.module';
import { ShowSmmaryComponent } from './show-smmary.component';

@NgModule({
  declarations: [ShowSmmaryComponent],
  imports: [
    CommonModule,
    ShowSmmaryRoutingModule,
    SharedModule,
    DirectivesModule,
    DynamicDialogModule
  ],
  exports: [ShowSmmaryComponent],
  providers: [DialogService]
})
export class ShowSmmaryModule { }
