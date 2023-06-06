import { BaseViewModel } from "projects/ts-public-client-lib/src/lib/models/base-view.model";
import { Users } from "projects/ts-public-client-lib/src/lib/models/users.model";

export interface UserProfileModel extends BaseViewModel {
    users?: Users;
}