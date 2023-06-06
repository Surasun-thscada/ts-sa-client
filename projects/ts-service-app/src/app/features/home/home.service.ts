import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Users } from 'projects/ts-public-client-lib/src/lib/models/users.model';
import { BaseService } from 'projects/ts-public-client-lib/src/lib/services/base.service';
import { AboutModel, HomeModel } from './home.model';

@Injectable({
    providedIn: 'root'
})
export class HomeService extends BaseService {
    constructor(
        private http: HttpClient,
        @Inject('BASE_HREF') baseHref: string
    ) {
        super(baseHref, 'auth');
    }

    getAbout() {
        return this.http.get<AboutModel>(this.getHrefCustom('api/shared') + 'getAbout');
    }

    login(users: Users) {
        return this.http.post<HomeModel>(this.getHref() + 'login', users);
    }

    logout(users: Users) {
        return this.http.post(this.getHref() + 'logout', users);
    }
}
