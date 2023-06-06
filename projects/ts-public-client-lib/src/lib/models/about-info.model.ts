import { BaseModel } from "./base.model";

export interface AboutInfo extends BaseModel {
    appName?: string;
    appVersion?: string;
    apiVersion?: string;
    serverDateTime?: string;
}