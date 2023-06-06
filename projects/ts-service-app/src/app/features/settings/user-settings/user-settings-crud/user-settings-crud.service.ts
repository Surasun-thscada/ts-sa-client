import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseCrudTreeService } from 'projects/ts-public-client-lib/src/lib/services/base-crud-tree-service';
import { UserSettingsCrudModel } from './user-settings-crud.model';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsCrudService extends BaseCrudTreeService<UserSettingsCrudModel> {
    constructor(
        http: HttpClient,
        @Inject('BASE_HREF') protected baseUrl: string
    ) {
        super(http, baseUrl, 'userSettings');
    }
}
