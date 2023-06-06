import { AboutInfo } from "projects/ts-public-client-lib/src/lib/models/about-info.model";
import { BaseViewModel } from "projects/ts-public-client-lib/src/lib/models/base-view.model";

export interface AppModel extends BaseViewModel {
    aboutInfo?: AboutInfo;
}