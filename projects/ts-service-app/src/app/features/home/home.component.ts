import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TRANSLOCO_SCOPE, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { BaseComponent } from 'projects/ts-public-client-lib/src/lib/components/base.component';
import { ResultMessage } from 'projects/ts-public-client-lib/src/lib/models/result-message.model';
import { Users } from 'projects/ts-public-client-lib/src/lib/models/users.model';
import { SharedService } from 'projects/ts-public-client-lib/src/lib/services/shared.service';
import { MaterialModule } from 'projects/ts-public-client-shared/src/app/modules/material.module';
import { ThemeService } from '../../core/services/theme.service';
import { AboutModel, HomeModel } from './home.model';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule, TranslocoModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'home'
    }
  ]
})
export class HomeComponent extends BaseComponent implements OnInit {
  homeModel: HomeModel = {
    users: {}
  };

  aboutModel: AboutModel = {
    aboutInfo: {}
  }

  hidePassword?: boolean = true;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public sharedService: SharedService,
    private homeService: HomeService,
    private translocoService: TranslocoService,
    private readonly themeService: ThemeService
  ) {
    super();
    this.setActiveLanguage(this.translocoService);
    this.setTitle();
  }

  ngOnInit(): void {
    this.getAbout();
  }

  setTitle() {
    this.sharedService.pageTitle = this.aboutModel.aboutInfo?.appName;
    this.sharedService.pageSubTitle = this.getUserInfo();
  }

  getAbout() {
    this.showLoading();
    this.homeService.getAbout().subscribe({
      next: (res) => {
        this.hideLoading();
        this.aboutModel = res;
        this.setTitle();
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  gotoLogin() {
    this.router.navigate(['login']);
  }

  preLogin(keyboardEvent: KeyboardEvent) {
    if (keyboardEvent.key === "Enter") {
      this.login();
    }
  }

  login() {
    this.showLoading();
    this.homeService.login(this.homeModel.users!).subscribe({
      next: (res) => {
        this.hideLoading();
        if (res.errorType! <= 0) {
          let tokenProfile = res.tokenInfo?.tokenProfile;
          let userProfile = res.tokenInfo?.userProfile;
          localStorage.setItem('token', tokenProfile?.token!);
          localStorage.setItem('tokenExpire', new Date(tokenProfile?.tokenExpire!).getTime().toString()!);
          localStorage.setItem('refreshToken', tokenProfile?.refreshToken!);
          localStorage.setItem('userID', userProfile?.id!.toString()!);
          localStorage.setItem('username', userProfile?.username!);
          localStorage.setItem('userFullName', userProfile?.fullName!);
          localStorage.setItem('userDateLogined', new Date(userProfile?.dateLogined!).getTime().toString()!);
          localStorage.setItem('userTypeID', userProfile?.userType!.toString()!);
          localStorage.setItem('language', userProfile?.languages?.languageCode!);
          localStorage.setItem('locale', userProfile?.languages?.lcid!);
          localStorage.setItem('sideMenuMode', userProfile?.sideMenuMode!.toString()!);

          let themeActive = this.sharedService.getTheme();
          if (themeActive.styleSheetFile != userProfile?.themes?.styleSheetFile) {
            this.sharedService.setTheme(userProfile?.themes!);
            this.themeService.setTheme(this.sharedService.getTheme());
          }

          this.router.navigate(['']);
          this.setTitle();
          this.setActiveLanguage(this.translocoService);
        } else {
          let resultMessage: ResultMessage = {
            status: 0,
            message: res.errorMessage
          }
          this.showSnackBar(this.snackBar, resultMessage);
        }
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  logout() {
    this.showLoading();

    let users: Users = {
      id: +this.sharedService.getUserID()!,
      username: this.sharedService.getUsername()!
    }

    this.sharedService.logout();
    this.router.navigate(['']);
    this.setTitle();

    this.homeService.logout(users).subscribe({
      next: (res) => {
        this.hideLoading();
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }
}
