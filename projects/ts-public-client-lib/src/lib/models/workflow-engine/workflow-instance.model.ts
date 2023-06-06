import { WorkflowMetaData } from "./workflow-meta-data.model";

export interface WorkflowInstance {
    $id?: string;
    id?: string;
    definitionId?: string;
    definitionVersionId?: string;
    version?: number;
    workflowStatus?: string;
    correlationId?: string;
    createdAt?: Date;
    lastExecutedAt?: Date;
    cancelledAt?: Date;
    metadata?: WorkflowMetaData;
}