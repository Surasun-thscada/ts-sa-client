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
import { Users } from 'projects/ts-public-client-lib/src/lib/models/users.model';
import { SharedService } from 'projects/ts-public-client-lib/src/lib/services/shared.service';
import { DialogSimpleConfirmComponent } from 'projects/ts-public-client-shared/src/app/core/components/dialog-simple-confirm/dialog-simple-confirm.component';
import { MaterialModule } from 'projects/ts-public-client-shared/src/app/modules/material.module';
import { UserSettingsCrudComponent } from './user-settings-crud/user-settings-crud.component';
import { UserSettingsCrudModel } from './user-settings-crud/user-settings-crud.model';
import { UserSettingsModel } from './user-settings.model';
import { UserSettingsService } from './user-settings.service';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule, TranslocoModule],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'settings/user-settings', alias: 'uss' }
    }
  ]
})
export class UserSettingsComponent extends BaseComponent implements OnInit {
  userSettingsModel: UserSettingsModel = {
    listUsers: []
  };

  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'userType', 'actions'];
  dataSource!: MatTableDataSource<Users>;
  filterValue!: string;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public sharedService: SharedService,
    private userSettingsService: UserSettingsService,
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
    this.sharedService.pageTitle = this.translocoService.translate('title.settings.userSettings');
    this.sharedService.pageSubTitle = this.getUserInfo();
  }

  applyTableFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getList() {
    this.showLoading();
    this.userSettingsService.getList().subscribe({
      next: (res) => {
        this.hideLoading();
        this.userSettingsModel = res;
        this.dataSource = new MatTableDataSource(this.userSettingsModel.listUsers);
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  openPropertiesDialog(mode: number, users: Users) {
    let dialogData: UserSettingsCrudModel = {
      mode: mode,
      modeName: this.getModeName(mode, this.translocoService),
      users: users
    };

    let dialogRef = this.dialog.open(UserSettingsCrudComponent, {
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

  delete(users: Users) {
    var dialogData = {
      title: this.translocoService.translate('dialog.simpleConfirmDelete.title'),
      message: this.translocoService.translate('dialog.simpleConfirmDelete.message', { name: users.username })
    };

    let dialogRef = this.dialog.open(DialogSimpleConfirmComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == '1') {
        this.showLoading();
        this.userSettingsService.delete(users).subscribe({
          next: (res) => {
            this.hideLoading();
            this.showSnackBar(this.snackBar, res);
            this.getList();
          },
          error: (err) => {
            this.hideLoading();
            this.showSnackBar(this.snackBar, err);
          }
        });
      }
    });
  }
}
