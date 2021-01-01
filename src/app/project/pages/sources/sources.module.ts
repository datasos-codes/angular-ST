import { SharedModule } from './../../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourcesRoutingModule } from './sources-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    SourcesRoutingModule
  ]
})
export class SourcesModule { }
