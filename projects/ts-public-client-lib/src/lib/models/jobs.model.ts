import { BaseModel } from "./base.model";
import { Branch } from "./branch.model";
import { JobsType } from "./jobs-type.model";
import { ProblemType } from "./problem-type.model";

export interface Jobs extends BaseModel {
    id?: number;
    ticketId?: String;
    serviceId?: String;
    branchId?: String;
    creator?:String;
    product?:String;
    problem?:String;
    jobType?:JobsType;
    problemType?:ProblemType;
    listJobsType?: JobsType[];
    listProblemType?: ProblemType[];
}