import { BaseModel } from './base.model';

export interface DialogResult extends BaseModel {
  value: string;
  optionsSelected: string;
}
