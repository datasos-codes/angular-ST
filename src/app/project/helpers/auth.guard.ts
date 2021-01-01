import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService, NotificationService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    errorMsg = `<h5 class="alert-heading">Warning!</h5> <p class="mb-0">Access denied.</p>`;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private notifyService: NotificationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser['flag'] === 1 && currentUser['data'] && currentUser['data'] !== '') {
            // check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(currentUser['data']['roleId']) === -1) {
                // role not authorised so redirect to home page
                this.notifyService.showError('Access denied.');
                this.router.navigate(['/']);
                return false;
            }
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }

}
