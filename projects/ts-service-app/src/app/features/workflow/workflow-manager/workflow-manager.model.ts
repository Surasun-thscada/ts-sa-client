import { BaseViewModel } from "projects/ts-public-client-lib/src/lib/models/base-view.model";
import { WorkflowDefination } from "projects/ts-public-client-lib/src/lib/models/workflow-engine/workflow-defination.model";
import { WorkflowInstance } from "projects/ts-public-client-lib/src/lib/models/workflow-engine/workflow-instance.model";
import { WorkflowRegistry } from "projects/ts-public-client-lib/src/lib/models/workflow-engine/workflow-registry.model";

export interface WorkflowManagerModel extends BaseViewModel {
}

export interface WorkflowDefinationModel extends BaseViewModel {
    items?: WorkflowDefination[];
    totalCount?: number;
}

export interface WorkflowInstanceModel extends BaseViewModel {
    items?: WorkflowInstance[];
    page?: number;
    pageSize?: number;
    totalCount?: number;
}

export interface WorkflowRegistryModel extends BaseViewModel {
    items?: WorkflowRegistry[];
}