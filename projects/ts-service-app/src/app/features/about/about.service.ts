import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseService } from 'projects/ts-public-client-lib/src/lib/services/base.service';
import { AboutModel } from './about.model';

@Injectable({
    providedIn: 'root'
})
export class AboutService extends BaseService {
    constructor(
        private http: HttpClient,
        @Inject('BASE_HREF') baseHref: string
    ) {
        super(baseHref, 'about');
    }

    getAbout() {
        return this.http.get<AboutModel>(this.getHrefCustom('shared') + 'getAbout');
    }
}
