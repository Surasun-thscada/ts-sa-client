import { BaseModel } from "./base.model";
import { GenericOptions } from "./generic-options.model";
import { Languages } from "./languages.model";
import { Themes } from "./themes.model";
import { UserType } from "./user-type.model";

export interface Users extends BaseModel {
    id?: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    dateLogined?: string;
    email?: string;
    mobile?: string;
    userType?: UserType;
    languages?: Languages;
    themes?: Themes;
    sideMenuMode?: GenericOptions;
    listUserType?: UserType[];
    listLanguages?: Languages[];
    listThemes?: Themes[];
    listSideMenuMode?: GenericOptions[];
}