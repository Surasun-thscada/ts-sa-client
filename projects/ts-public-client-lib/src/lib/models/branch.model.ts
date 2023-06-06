import { BaseModel } from "./base.model";

export interface Branch extends BaseModel {
    id?: number;
    name?: String;
    code?: String;
    address?: String;
    tel?: String;
    telAdsl?: String;
}