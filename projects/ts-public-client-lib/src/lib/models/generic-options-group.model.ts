import { BaseMasterModel } from './base-master.model';
import { GenericOptions } from './generic-options.model';

export interface GenericOptionsGroup extends BaseMasterModel {
    listGenericOptions: GenericOptions[];
}