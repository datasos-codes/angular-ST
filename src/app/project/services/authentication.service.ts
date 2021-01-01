import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public headers: any = { 'content-type': 'application/json' };
    private baseUrl: string = environment.baseUrl;
    private controllerName = 'Login/';
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    loggedInUserData: any;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    loginUser(loginData: any): Observable<any> {
        const serviceUrl = `${this.baseUrl}${this.controllerName}Login`;
        return this.http.post<any>(serviceUrl, loginData, { headers: this.headers }).pipe(
            map(user => {
                // login successful if there's a jwt Token in the response
                if (user && user.token) {
                    // store user details and jwt Token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            })
        );
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    IsUserId(): any {
        this.loggedInUserData = this.currentUserValue;
        if (this.loggedInUserData && this.loggedInUserData['flag'] === 1 &&
            this.loggedInUserData['data'] && this.loggedInUserData['data'] !== '') {
            return this.loggedInUserData['data']['userId'];
        } else {
            return null;
        }
    }
}
