import { BaseViewModel } from "projects/ts-public-client-lib/src/lib/models/base-view.model";
import { Branch } from "projects/ts-public-client-lib/src/lib/models/branch.model";
import { Jobs } from "projects/ts-public-client-lib/src/lib/models/jobs.model";

export interface JobCreateCrudModel extends BaseViewModel {
    jobs?: Jobs;
    branch?: Branch;

}