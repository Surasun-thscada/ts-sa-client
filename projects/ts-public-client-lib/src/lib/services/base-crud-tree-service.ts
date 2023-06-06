import { HttpClient } from '@angular/common/http';
import { ResultMessage } from '../models/result-message.model';
import { BaseCrudService } from './base-crud-service';

export abstract class BaseCrudTreeService<T> extends BaseCrudService<T> {
    constructor(
        http: HttpClient,
        baseHref: string,
        baseApi: string
    ) {
        super(http, baseHref, baseApi);
    }

    getTree(nodeLevel: number, node1: number, node2: number) {
        return this.http.get<T>(this.getHref() + 'getTree/' + nodeLevel + '/' + node1 + '/' + node2, {
            headers: this.getHeaders()!
        });
    }

    getTree3Levels(nodeLevel: number, node1: number, node2: number, node3: number) {
        return this.http.get<T>(this.getHref() + 'getTree/' + nodeLevel + '/' + node1 + '/' + node2 + '/' + node3, {
            headers: this.getHeaders()!
        });
    }

    getTree4Levels(nodeLevel: number, node1: number, node2: number, node3: number, node4: number) {
        return this.http.get<T>(this.getHref() + 'getTree/' + nodeLevel + '/' + node1 + '/' + node2 + '/' + node3 + '/' + node4, {
            headers: this.getHeaders()!
        });
    }

    getTree5Levels(nodeLevel: number, node1: number, node2: number, node3: number, node4: number, node5: number) {
        return this.http.get<T>(this.getHref() + 'getTree/' + nodeLevel + '/' + node1 + '/' + node2 + '/' + node3 + '/' + node4 + '/' + node5, {
            headers: this.getHeaders()!
        });
    }

    duplicateNode(nodeLevel: number, nodeID: number) {
        return this.http.get<ResultMessage>(this.getHref() + 'duplicateNode/' + nodeLevel + '/' + nodeID, {
            headers: this.getHeaders()!
        });
    }

    moveUpNode(nodeLevel: number, nodeID: number) {
        return this.http.get<ResultMessage>(this.getHref() + 'moveUpNode/' + nodeLevel + '/' + nodeID, {
            headers: this.getHeaders()!
        });
    }

    moveDownNode(nodeLevel: number, nodeID: number) {
        return this.http.get<ResultMessage>(this.getHref() + 'moveDownNode/' + nodeLevel + '/' + nodeID, {
            headers: this.getHeaders()!
        });
    }

    deleteNode(nodeLevel: number, nodeID: number) {
        return this.http.get<ResultMessage>(this.getHref() + 'deleteNode/' + nodeLevel + '/' + nodeID, {
            headers: this.getHeaders()!
        });
    }
}
