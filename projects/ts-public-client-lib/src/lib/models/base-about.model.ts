import { AboutInfo } from "./about-info.model";
import { BaseViewModel } from "./base-view.model";

export interface BaseAboutModel extends BaseViewModel {
    aboutInfo?: AboutInfo;
}