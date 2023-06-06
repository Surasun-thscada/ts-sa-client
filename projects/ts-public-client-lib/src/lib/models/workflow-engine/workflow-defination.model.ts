
export interface WorkflowDefination {
    id?: string;
    definitionId?: string;
    name?: string;
    displayName?: string;
    version?: number;
    isSingleton?: boolean;
    persistenceBehavior?: string;
    isPublished?: boolean;
    isLatest?: boolean;
    customAttributes?: string;
    createdAt?: Date;
}
