import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { WorkflowRegistry } from 'projects/ts-public-client-lib/src/lib/models/workflow-engine/workflow-registry.model';
import { BaseCrudService } from 'projects/ts-public-client-lib/src/lib/services/base-crud-service';
import { WorkflowDefinationModel, WorkflowInstanceModel, WorkflowManagerModel } from './workflow-manager.model';

@Injectable({
    providedIn: 'root'
})
export class WorkflowManagerService extends BaseCrudService<WorkflowManagerModel> {
    constructor(
        http: HttpClient,
        @Inject('BASE_HREF') protected baseUrl: string,
        @Inject('BASE_API_CUSTOM') protected baseApiCustom: string
    ) {
        super(http, baseUrl, 'workflowManager');
    }

    getListWorkflowDefination() {
        return this.http.get<WorkflowDefinationModel>(this.getHrefCustom(this.baseApiCustom) + 'workflow-definitions', {
            headers: this.getHeaders()!
        });
    }

    getListWorkflowInstance() {
        return this.http.get<WorkflowInstanceModel>(this.getHrefCustom(this.baseApiCustom) + 'workflow-instances', {
            headers: this.getHeaders()!
        });
    }

    getListWorkflowRegistry() {
        return this.http.get<WorkflowRegistry[]>(this.getHrefCustom(this.baseApiCustom) + 'workflow-registry', {
            headers: this.getHeaders()!
        });
    }

    executeWorkflow(baseApi: string) {
        let model = {
            "Id": "99",
            "Author": {
                "Name": "John",
                "Email": "john@gmail.com"
            },
            "Body": "This is sample document."
        };

        return this.http.post(this.getHrefCustom(baseApi), model, {
            headers: this.getHeaders()!
        });
    }
}
