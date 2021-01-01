import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../../../../project/services';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {
  loginUserName: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    const loginUserData = this.authenticationService.currentUserValue['data'];
    this.loginUserName = loginUserData.firstName + ' ' + loginUserData.lastName;
   }

  userLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
