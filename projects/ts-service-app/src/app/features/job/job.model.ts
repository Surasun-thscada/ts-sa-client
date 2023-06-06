import { BaseViewModel } from "projects/ts-public-client-lib/src/lib/models/base-view.model";
import { Jobs } from "projects/ts-public-client-lib/src/lib/models/jobs.model";

export interface JobModel extends BaseViewModel  {
    listJobs?:Jobs[];
}