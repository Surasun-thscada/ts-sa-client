import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TRANSLOCO_SCOPE, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { BaseComponent } from 'projects/ts-public-client-lib/src/lib/components/base.component';
import { WorkflowDefination } from 'projects/ts-public-client-lib/src/lib/models/workflow-engine/workflow-defination.model';
import { WorkflowInstance } from 'projects/ts-public-client-lib/src/lib/models/workflow-engine/workflow-instance.model';
import { WorkflowRegistry } from 'projects/ts-public-client-lib/src/lib/models/workflow-engine/workflow-registry.model';
import { SharedService } from 'projects/ts-public-client-lib/src/lib/services/shared.service';
import { MaterialModule } from 'projects/ts-public-client-shared/src/app/modules/material.module';
import { WorkflowDefinationModel, WorkflowInstanceModel, WorkflowManagerModel, WorkflowRegistryModel } from './workflow-manager.model';
import { WorkflowManagerService } from './workflow-manager.service';

@Component({
  selector: 'app-workflow-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule, TranslocoModule],
  templateUrl: './workflow-manager.component.html',
  styleUrls: ['./workflow-manager.component.css'],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'workflow/workflow-manager', alias: 'wom' }
    }
  ]
})
export class WorkflowManagerComponent extends BaseComponent implements OnInit {
  workflowManagerModel: WorkflowManagerModel = {
  };

  workflowDefinationModel: WorkflowDefinationModel = {
    items: []
  };

  workflowInstanceModel: WorkflowInstanceModel = {
    items: []
  };

  workflowRegistryModel: WorkflowRegistryModel = {
    items: []
  };

  displayedColumnsDefination: string[] = ['displayName', 'version', 'isPublished', 'isLatest', 'createdAt', 'actions'];
  displayedColumnsInstance: string[] = ['definitionId', 'correlationId', 'workflowName', 'version', 'workflowStatus', 'createdAt', 'finishedAt', 'lastExecutedAt', 'faultedAt'];
  displayedColumnsRegistry: string[] = ['displayName', 'version', 'isPublished', 'isLatest', 'actions'];
  dataSourceWorkflowDefination!: MatTableDataSource<WorkflowDefination>;
  dataSourceWorkflowInstance!: MatTableDataSource<WorkflowInstance>;
  dataSourceWorkflowRegistry!: MatTableDataSource<WorkflowRegistry>;
  filterValue!: string;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public sharedService: SharedService,
    private workflowManagerService: WorkflowManagerService,
    private translocoService: TranslocoService
  ) {
    super();
    this.setActiveLanguage(this.translocoService);
    this.setTitle();
  }

  ngOnInit(): void {
    this.getList();
  }

  setTitle() {
    this.sharedService.pageTitle = this.translocoService.translate('title.workflow.workflowManager');
    this.sharedService.pageSubTitle = this.getUserInfo();
  }

  getList() {
    this.getListWorkflowDefination();
    this.getListWorkflowInstance();
    this.getListWorkflowRegistry();
  }

  getListWorkflowDefination() {
    this.showLoading();
    this.workflowManagerService.getListWorkflowDefination().subscribe({
      next: (res) => {
        this.hideLoading();
        this.workflowDefinationModel = res;
        this.dataSourceWorkflowDefination = new MatTableDataSource(this.workflowDefinationModel.items);
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  getListWorkflowInstance() {
    this.showLoading();
    this.workflowManagerService.getListWorkflowInstance().subscribe({
      next: (res) => {
        this.hideLoading();
        this.workflowInstanceModel = res;
        this.dataSourceWorkflowInstance = new MatTableDataSource(this.workflowInstanceModel.items);
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  getListWorkflowRegistry() {
    this.showLoading();
    this.workflowManagerService.getListWorkflowRegistry().subscribe({
      next: (res) => {
        this.hideLoading();
        this.workflowRegistryModel.items = res;
        this.dataSourceWorkflowRegistry = new MatTableDataSource(this.workflowRegistryModel.items);
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  executeWorkflowDefination() {
    this.showLoading();
    this.workflowManagerService.executeWorkflow('v1/documents').subscribe({
      next: (res) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, res);
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  executeWorkflowRegistry() {
    this.showLoading();
    this.workflowManagerService.executeWorkflow('v1/documents').subscribe({
      next: (res) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, res);
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  openPropertiesDialog(mode: number, workflowDefination: WorkflowDefination) {
  }

  delete(workflowDefination: WorkflowDefination) {
  }
}

