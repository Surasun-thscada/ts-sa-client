import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TRANSLOCO_SCOPE, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { BaseComponent } from 'projects/ts-public-client-lib/src/lib/components/base.component';
import { Users } from 'projects/ts-public-client-lib/src/lib/models/users.model';
import { SharedService } from 'projects/ts-public-client-lib/src/lib/services/shared.service';
import { MaterialModule } from 'projects/ts-public-client-shared/src/app/modules/material.module';
import { UserSettingsCrudModel } from './user-settings-crud.model';
import { UserSettingsCrudService } from './user-settings-crud.service';

@Component({
  selector: 'app-user-settings-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule, TranslocoModule],
  templateUrl: './user-settings-crud.component.html',
  styleUrls: ['./user-settings-crud.component.css'],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'settings/user-settings', alias: 'uss' }
    }
  ]
})
export class UserSettingsCrudComponent extends BaseComponent implements OnInit {
  userSettingsCrudModel: UserSettingsCrudModel = {
    users: {}
  };

  dialogTitle: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public sharedService: SharedService,
    private userSettingsCrudService: UserSettingsCrudService,
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

  getByID(users: Users) {
    this.showLoading();
    this.userSettingsCrudService.getByID(users.id!).subscribe({
      next: (res) => {
        this.hideLoading();
        this.userSettingsCrudModel = res
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  getDefault() {
    this.showLoading();
    this.userSettingsCrudService.getDefault().subscribe({
      next: (res) => {
        this.hideLoading();
        this.userSettingsCrudModel = res;
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  getDuplicate(users: Users) {
    this.showLoading();
    this.userSettingsCrudService.getDuplicate(users.id!).subscribe({
      next: (res) => {
        this.hideLoading();
        this.userSettingsCrudModel = res;
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  save() {
    this.showLoading();
    this.userSettingsCrudService.save(this.userSettingsCrudModel.users!).subscribe({
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
}