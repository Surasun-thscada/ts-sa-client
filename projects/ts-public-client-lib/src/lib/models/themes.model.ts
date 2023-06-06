import { BaseMasterModel } from "./base-master.model";

export interface Themes extends BaseMasterModel {
    isDarkTheme?: boolean;
    styleSheetFile?: string;
}