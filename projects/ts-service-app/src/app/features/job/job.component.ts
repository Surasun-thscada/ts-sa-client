import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'projects/ts-public-client-lib/src/lib/components/base.component';
import { JobModel } from './job.model';
import { JobService } from './job.service';
import { TRANSLOCO_SCOPE, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { SharedService } from 'projects/ts-public-client-lib/src/lib/services/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MaterialModule } from 'projects/ts-public-client-shared/src/app/modules/material.module';
import { Jobs } from 'projects/ts-public-client-lib/src/lib/models/jobs.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { JobCreateCrudModel } from './job-create-crud/job-create-crud.model';
import { JobCreateCrudComponent } from './job-create-crud/job-create-crud.component';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule, TranslocoModule],
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'job', alias: 'jm' }
    }
  ]
})
export class JobComponent extends BaseComponent implements OnInit{

  job: JobModel = {
    listJobs: []
  };

  displayedColumns: string[] = ['id', 'ticKetId', 'serviceId','product','problem','creator'];
  dataSource!: MatTableDataSource<Jobs>;
  filterValue!: string;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public sharedService: SharedService,
    private jobService: JobService,
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
    this.sharedService.pageTitle = this.translocoService.translate('title.job.main');
    this.sharedService.pageSubTitle = this.getUserInfo();
  }

  getJobs() {
    this.showLoading();
    this.jobService.getJobs().subscribe({
      next: (res) => {
        this.hideLoading();
        this.job = res;

      },
      error: (err) => {
        this.hideLoading();
      }
    });
  }

  openPropertiesDialog(mode: number,job:Jobs) {
    let dialogData: JobCreateCrudModel = {
      mode: mode,
      modeName: this.getModeName(mode, this.translocoService),
      jobs: job
    };

    let dialogRef = this.dialog.open(JobCreateCrudComponent, {
      data: dialogData,
      width: '1200px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.getList();
      }
    });
  }
  getList() {
    this.showLoading();
    this.jobService.getList().subscribe({
      next: (res) => {
        this.hideLoading();
        this.job = res;
        this.dataSource = new MatTableDataSource(this.job.listJobs);
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  applyTableFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(users: Jobs) {
   
  }
}
