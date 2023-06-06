import { BaseModel } from "./base.model";
import { TokenProfile } from "./token-profile.model";
import { Users } from "./users.model";

export interface TokenInfo extends BaseModel {
    tokenProfile?: TokenProfile;
    userProfile?: Users;
}