import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, NotificationService } from '../../services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notifyService: NotificationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get validationControls() { return this.loginForm.controls; }

  submitLoginForm() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loading = true;
      const loginDetails = {
        UserName: this.validationControls.username.value,
        Password: this.validationControls.password.value,
      };
      this.authenticationService.loginUser(loginDetails).pipe(first()).subscribe(user => {
        if (user && user['flag'] === 1 && user['data'] !== '') {
          this.loading = false;
          this.router.navigate(['/']);
        } else if (user && user['flag'] === 0) {
          this.loading = false;
          this.notifyService.showError(user['message']);
        }
      }, error => {
        this.loading = false;
        console.log(error);
      });
    }
  }

}
