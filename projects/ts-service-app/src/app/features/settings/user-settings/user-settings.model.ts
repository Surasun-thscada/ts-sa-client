import { BaseViewModel } from "projects/ts-public-client-lib/src/lib/models/base-view.model";
import { Users } from "projects/ts-public-client-lib/src/lib/models/users.model";

export interface UserSettingsModel extends BaseViewModel {
    listUsers?: Users[];
}