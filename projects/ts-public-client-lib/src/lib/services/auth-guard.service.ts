import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {
    constructor(private router: Router) {
    }

    canActivate() {
        let jwtHelper = new JwtHelperService();
        var token = localStorage.getItem('token');

        if (token && !jwtHelper.isTokenExpired(token)) {
            return true;
        }

        this.router.navigate(['']);
        return false;
    }
}
