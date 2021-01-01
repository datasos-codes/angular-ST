import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser['token'];
        const isBaseUrl = request.url.startsWith(environment.baseUrl);
        if (isLoggedIn && isBaseUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser['token']}`
                }
            });
        }

        return next.handle(request);
    }
}