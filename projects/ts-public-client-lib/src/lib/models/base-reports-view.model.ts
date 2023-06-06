import { BaseViewModel } from "./base-view.model";

export interface BaseReportsViewModel extends BaseViewModel {
    dateTimeFrom?: Date;
    dateTimeTo?: Date;
}