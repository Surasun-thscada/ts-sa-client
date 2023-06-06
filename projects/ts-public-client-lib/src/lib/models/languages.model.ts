import { BaseMasterModel } from "./base-master.model";

export interface Languages extends BaseMasterModel {
    languageCode?: string;
    lcid?: string;
}