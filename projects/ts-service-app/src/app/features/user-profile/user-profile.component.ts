import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TRANSLOCO_SCOPE, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { BaseComponent } from 'projects/ts-public-client-lib/src/lib/components/base.component';
import { SharedService } from 'projects/ts-public-client-lib/src/lib/services/shared.service';
import { MaterialModule } from 'projects/ts-public-client-shared/src/app/modules/material.module';
import { ThemeService } from '../../core/services/theme.service';
import { UserProfileModel } from './user-profile.model';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule, TranslocoModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'user-profile', alias: 'usp' }
    }
  ]
})
export class UserProfileComponent extends BaseComponent implements OnInit {
  userProfileModel: UserProfileModel = {
    users: {}
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public sharedService: SharedService,
    private userProfileService: UserProfileService,
    private translocoService: TranslocoService,
    private readonly themeService: ThemeService
  ) {
    super();
    this.setActiveLanguage(this.translocoService);
    this.setTitle();
  }

  ngOnInit() {
    this.getByID();
  }

  setTitle() {
    this.sharedService.pageTitle = this.translocoService.translate('title.userProfile');
    this.sharedService.pageSubTitle = this.getUserInfo();
  }

  getByID() {
    this.showLoading();
    this.userProfileService.getByID(+this.sharedService.getUserID()!).subscribe({
      next: (res) => {
        this.hideLoading();
        this.userProfileModel = res

        let themeActive = this.sharedService.getTheme();
        if (themeActive.styleSheetFile != this.userProfileModel.users?.themes?.styleSheetFile) {
          this.sharedService.setTheme(this.userProfileModel.users?.themes!);
          this.themeService.setTheme(this.sharedService.getTheme());
        }

        if (this.getLanguage() != this.userProfileModel.users?.languages?.languageCode) {
          this.setLanguage(this.userProfileModel.users?.languages?.languageCode!);
          this.setActiveLanguage(this.translocoService);
        }

        if (this.getSideMenuModeRaw() != this.userProfileModel.users?.sideMenuMode?.id) {
          this.setSideMenuMode(this.userProfileModel.users?.sideMenuMode?.id!);
        }
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  save() {
    this.showLoading();
    this.userProfileService.save(this.userProfileModel.users!).subscribe({
      next: (res) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, res);
        this.getByID();
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }
}