import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BaseCrudTreeService } from "projects/ts-public-client-lib/src/lib/services/base-crud-tree-service";
import { JobCreateCrudModel } from "./job-create-crud.model";
import { Branch } from "projects/ts-public-client-lib/src/lib/models/branch.model";
import { JobModel } from "../job.model";
import { Jobs } from "projects/ts-public-client-lib/src/lib/models/jobs.model";

@Injectable({
    providedIn: 'root'
})
export class JobCretaeCrudService extends BaseCrudTreeService<JobCreateCrudModel> {
    constructor(
        http: HttpClient,
        @Inject('BASE_HREF') protected baseUrl: string
    ) {
        super(http, baseUrl, 'jobs');
    }

    getBrachByCode(code:String) {

        return this.http.get<Branch>(this.baseHref + 'api/branch/getByCode/' + code, {
            headers: this.getHeaders()!
        });
    }
}