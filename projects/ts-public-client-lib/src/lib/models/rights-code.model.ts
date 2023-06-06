import { BaseModel } from "./base.model";

export interface RightsCode extends BaseModel {
    rightCode?: number;
    rightDesc?: string;
    ord?: number;
    displayText?: string;
    value?: number;
}