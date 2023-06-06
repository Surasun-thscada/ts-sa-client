import { BaseAboutModel } from "projects/ts-public-client-lib/src/lib/models/base-about.model";
import { BaseViewModel } from "projects/ts-public-client-lib/src/lib/models/base-view.model";
import { TokenInfo } from "projects/ts-public-client-lib/src/lib/models/token-info.model";
import { Users } from "projects/ts-public-client-lib/src/lib/models/users.model";

export interface HomeModel extends BaseViewModel {
    tokenInfo?: TokenInfo;
    users?: Users;
    isRedirect?: boolean;
    redirectUrl?: string;
    errorType?: number;
    errorMessage?: string;
    isKeepAlive?: boolean;
}

export interface AboutModel extends BaseAboutModel {

}