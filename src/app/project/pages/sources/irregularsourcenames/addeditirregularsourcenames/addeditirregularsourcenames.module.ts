import { SharedModule } from './../../../../../theme/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddeditirregularsourcenamesRoutingModule } from './addeditirregularsourcenames-routing.module';
import { AddeditirregularsourcenamesComponent } from './addeditirregularsourcenames.component';
import { DirectivesModule } from 'src/app/project/directive/directives.module';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [AddeditirregularsourcenamesComponent],
  exports: [AddeditirregularsourcenamesComponent],
  imports: [
    CommonModule,
    SharedModule,
    AddeditirregularsourcenamesRoutingModule,
    DirectivesModule,
    DynamicDialogModule,
    DropdownModule,
    InputTextModule
  ],
  providers: [
    DialogService
  ]
})
export class AddeditirregularsourcenamesModule { }
