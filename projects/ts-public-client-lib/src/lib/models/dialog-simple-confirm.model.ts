import { BaseModel } from './base.model';
import { GenericOptions } from './generic-options.model';

export interface DialogSimpleConfirm extends BaseModel {
  title?: string;
  message?: string;
  buttonText1?: string;
  buttonText2?: string;
  buttonText3?: string;
  buttonText4?: string;
  listOptions1?: GenericOptions[];
  listOptions2?: GenericOptions[];
  listOptions3?: GenericOptions[];
  listOptions4?: GenericOptions[];
}
