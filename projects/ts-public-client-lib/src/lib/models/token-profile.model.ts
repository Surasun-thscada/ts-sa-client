import { BaseModel } from "./base.model";

export interface TokenProfile extends BaseModel {
    token?: string;
    tokenExpire?: Date;
    refreshToken?: string;
}