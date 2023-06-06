export interface ResultMessage {
    status?: number;
    message?: string;
    objectID?: number;
    objectResult?: any;
    listObjectID?: number[];
    error?: ResultMessage;
}