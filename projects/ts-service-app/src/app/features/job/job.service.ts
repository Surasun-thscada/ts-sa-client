import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseService } from 'projects/ts-public-client-lib/src/lib/services/base.service';
import { JobModel } from './job.model';
import { BaseCrudService } from 'projects/ts-public-client-lib/src/lib/services/base-crud-service';

@Injectable({
    providedIn: 'root'
})
export class JobService extends BaseCrudService<JobModel> {
    constructor(
        http: HttpClient,
        @Inject('BASE_HREF') baseHref: string
    ) {
        super(http,baseHref, 'jobs');
    }

    getJobs() {
        return this.http.get<JobModel>(this.getHref() + 'getJobs');
    }
}
