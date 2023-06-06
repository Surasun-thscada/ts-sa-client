export interface WorkflowRegistry {
    id?: string;
    versionId?: string;
    name?: string;
    displayName?: string;
    version?: number;
    isSingleton?: boolean;
    isPublished?: boolean;
    isLatest?: boolean;
    isDisabled?: boolean;
}