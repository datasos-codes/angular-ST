import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../theme/shared/shared.module';
import { AuthSigninRoutingModule } from './auth-signin-routing.module';
import { AuthSigninComponent } from './auth-signin.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    AuthSigninRoutingModule,
    SharedModule,
    InputTextModule,
  ],
  declarations: [AuthSigninComponent]
})
export class AuthSigninModule { }
