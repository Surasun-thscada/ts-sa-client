import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseCrudService } from 'projects/ts-public-client-lib/src/lib/services/base-crud-service';
import { UserSettingsModel } from './user-settings.model';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsService extends BaseCrudService<UserSettingsModel> {
    constructor(
        http: HttpClient,
        @Inject('BASE_HREF') protected baseUrl: string
    ) {
        super(http, baseUrl, 'userSettings');
    }
}
