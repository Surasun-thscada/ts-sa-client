import { BaseModel } from "./base.model";

export interface ProblemType extends BaseModel {
    id?: number;
    name?: String;
    description?: String;
    enable?: Boolean;
    ord?: number;
}