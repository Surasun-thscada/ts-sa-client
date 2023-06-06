import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseCrudTreeService } from 'projects/ts-public-client-lib/src/lib/services/base-crud-tree-service';
import { UserProfileModel } from './user-profile.model';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService extends BaseCrudTreeService<UserProfileModel> {
    constructor(
        http: HttpClient,
        @Inject('BASE_HREF') protected baseUrl: string
    ) {
        super(http, baseUrl, 'userProfile');
    }
}
