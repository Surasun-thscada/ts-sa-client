import { BaseMasterModel } from './base-master.model';

export interface GenericOptions extends BaseMasterModel {
    key?: string;
    type?: number;
    parameter?: string;
    iconName?: string;
}