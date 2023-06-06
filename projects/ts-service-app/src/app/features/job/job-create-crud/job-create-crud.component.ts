import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TRANSLOCO_SCOPE, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { BaseComponent } from 'projects/ts-public-client-lib/src/lib/components/base.component';
import { MaterialModule } from 'projects/ts-public-client-shared/src/app/modules/material.module';
import { JobCreateCrudModel } from './job-create-crud.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'projects/ts-public-client-lib/src/lib/services/shared.service';
import { UserSettingsCrudComponent } from '../../settings/user-settings/user-settings-crud/user-settings-crud.component';
import { UserSettingsCrudModel } from '../../settings/user-settings/user-settings-crud/user-settings-crud.model';
import { UserSettingsCrudService } from '../../settings/user-settings/user-settings-crud/user-settings-crud.service';
import { Jobs } from 'projects/ts-public-client-lib/src/lib/models/jobs.model';
import { JobCretaeCrudService } from './job-create-crud.service';
import { Branch } from 'projects/ts-public-client-lib/src/lib/models/branch.model';

@Component({
  selector: 'app-job-create-crud',
  templateUrl: './job-create-crud.component.html',
  styleUrls: ['./job-create-crud.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule, TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'job/job-create', alias: 'jc' }
    }
  ]
  
})
export class JobCreateCrudComponent extends BaseComponent implements OnInit {
  jobCreateCrudModel: JobCreateCrudModel = {
    jobs:{},
    branch:{}
  }
  dialogTitle: string = '';







  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public sharedService: SharedService,
    private jobCretaeCrudService: JobCretaeCrudService,
    private dialogRef: MatDialogRef<UserSettingsCrudComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: UserSettingsCrudModel,
    private translocoService: TranslocoService
  ) {
    super();
    this.setActiveLanguage(this.translocoService);
  }

  ngOnInit() {
    this.sharedService.dialogTitle = this.dialogData.modeName;

    switch (this.dialogData.mode) {
      case 1:
      case 2:
        this.getByID(this.dialogData.users!);
        break;
      case 3:
        this.getDuplicate(this.dialogData.users!);
        break;
      case 4:
        break;
      default:
        this.getDefault();
        break;
    }
  }

  getByID(job: Jobs) {
    this.showLoading();
    this.jobCretaeCrudService.getByID(job.id!).subscribe({
      next: (res) => {
        this.hideLoading();
        this.jobCreateCrudModel = res
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  getDefault() {
    this.showLoading();
    this.jobCretaeCrudService.getDefault().subscribe({
      next: (res) => {
        this.hideLoading();
        this.jobCreateCrudModel = res;
        this.jobCreateCrudModel.jobs!.creator = this.getUserInfo();
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  getDuplicate(job: Jobs) {
    this.showLoading();
    this.jobCretaeCrudService.getDuplicate(job.id!).subscribe({
      next: (res) => {
        this.hideLoading();
        this.jobCreateCrudModel = res;
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }
  //B10923
  getBrachByCode(branchCode: String) {
    this.showLoading();
    this.jobCretaeCrudService.getBrachByCode(branchCode).subscribe({
      next: (res) => {
        this.hideLoading();
        this.jobCreateCrudModel!.branch = res;
        console.log(this.jobCreateCrudModel!.branch );
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }
  save() {
    this.showLoading();
    this.jobCretaeCrudService.save(this.jobCreateCrudModel.jobs!).subscribe({
      next: (res) => {
        this.hideLoading();
        this.dialogRef.close(res);
        this.showSnackBar(this.snackBar, res);
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }

  applyBranchChange(event: Event) {
    const branchCode = (event.target as HTMLInputElement).value;
    this.getBrachByCode(branchCode);
  }
}
