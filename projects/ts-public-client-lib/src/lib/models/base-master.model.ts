import { BaseModel } from './base.model';

export interface BaseMasterModel extends BaseModel {
  id?: number;
  name?: string;
  description?: string;
  fullName?: string;
  enable?: boolean;
  ord?: number;
  code?: number;
  key?: string;
  type?: number;
  status?: number;
  nameWithDesc?: string;
}
