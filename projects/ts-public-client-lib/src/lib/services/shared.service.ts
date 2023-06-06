import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Themes } from '../models/themes.model';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    pageTitle?: string;
    pageSubTitle?: string;
    pageMenuTitle?: string;
    dialogTitle?: string;
    isDarkTheme?: boolean;

    constructor(private router: Router) {
    }

    isUserAuthenticated() {
        let jwtHelper: JwtHelperService = new JwtHelperService();
        let token: string = localStorage.getItem('token')!;

        if (token && !jwtHelper.isTokenExpired(token)) {
            return true;
        }
        else {
            return false;
        }
    }

    isSupervisorRole() {
        return +localStorage.getItem('userTypeID')! >= 2 ? true : false;
    }

    isAdministratorRole() {
        return +localStorage.getItem('userTypeID')! == 3 ? true : false;
    }

    getUserType() {
        return localStorage.getItem('userTypeID');
    }

    getUserID() {
        return localStorage.getItem('userID');
    }

    getUsername() {
        return localStorage.getItem('username');
    }

    getUserDateLogined() {
        return new Date(parseInt(localStorage.getItem('userDateLogined')!));
    }

    getTokenExpire() {
        return new Date(parseInt(localStorage.getItem('tokenExpire')!));
    }

    getTheme(): Themes {
        let themeName = localStorage.getItem('themeName');
        let isDarkTheme = localStorage.getItem('isDarkTheme');

        if (themeName && isDarkTheme) {
            return {
                styleSheetFile: themeName,
                isDarkTheme: isDarkTheme == '1' ? true : false
            };
        }

        return {
            styleSheetFile: 'indigo-pink',
            isDarkTheme: false
        }
    }

    setTheme(themes: Themes) {
        this.isDarkTheme = themes.isDarkTheme;
        localStorage.setItem('themeName', themes.styleSheetFile!);
        localStorage.setItem('isDarkTheme', themes.isDarkTheme ? '1' : '0');
    }

    logout() {
        this.removeLocalStorage();
    }

    logoutAndRedirect() {
        this.removeLocalStorage();
        this.router.navigate(['']);
    }

    removeLocalStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpire');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userID');
        localStorage.removeItem('username');
        localStorage.removeItem('userFullName');
        localStorage.removeItem('userDateLogined');
        localStorage.removeItem('userTypeID');
        localStorage.removeItem('language');
    }

    getMatTableStyle() {
        return this.isDarkTheme ? 'mat-table-generic-dark' : 'mat-table-generic'
    }

    getTSTableStyle() {
        return this.isDarkTheme ? 'ts-table-generic-dark' : 'ts-table-generic'
    }
}
