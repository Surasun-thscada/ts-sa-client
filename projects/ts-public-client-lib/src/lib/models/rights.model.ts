import { BaseModel } from "./base.model";
import { RightsCode } from "./rights-code.model";
import { Users } from "./users.model";

export interface Rights extends BaseModel {
    id?: number;
    users?: Users;
    rightsCode?: RightsCode;
    enable?: boolean;
}

