import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService, NotificationService } from '../services';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    options = {
        autoClose: true,
        keepAfterRouteChange: false
    };
    errorMsg = `<h5 class="alert-heading">Warning!</h5> <p class="mb-0">Logout successfully.</p>`;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private notifyService: NotificationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.notifyService.showError('Something went to wrong.');
                this.authenticationService.logout();
                this.router.navigate(['/login']);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
