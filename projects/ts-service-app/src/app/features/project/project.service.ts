import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseService } from 'projects/ts-public-client-lib/src/lib/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectService extends BaseService {
    constructor(
        private http: HttpClient,
        @Inject('BASE_HREF') baseHref: string
    ) {
        super(baseHref, 'auth');
    }

}
