import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { BaseComponent } from 'projects/ts-public-client-lib/src/lib/components/base.component';
import { ThemeOptions } from 'projects/ts-public-client-lib/src/lib/models/theme-options.model';
import { Users } from 'projects/ts-public-client-lib/src/lib/models/users.model';
import { SharedService } from 'projects/ts-public-client-lib/src/lib/services/shared.service';
import { MaterialModule } from 'projects/ts-public-client-shared/src/app/modules/material.module';
import { Observable } from 'rxjs';
import { AppModel } from './app.model';
import { AppService } from './app.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule, TranslocoModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {
  appModel: AppModel = {
    aboutInfo: {}
  };

  options$: Observable<Array<ThemeOptions>> = this.themeService.getThemeOptions();

  mobileQuery: MediaQueryList;
  isShowWorkflowSubmenu: boolean = false;
  isShowReportsSubmenu: boolean = false;
  isShowProjectSubmenu: boolean = false;
  isShowSettingSubmenu: boolean = false;
  isShowJobSubmenu: boolean = false;

  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public sharedService: SharedService,
    private appService: AppService,
    private readonly themeService: ThemeService,
    public translocoService: TranslocoService) {
    super();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);

    this.themeService.setTheme(this.sharedService.getTheme());
    this.setActiveLanguage(this.translocoService);
    this.setTitle();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  setTitle() {
    this.sharedService.pageTitle = this.appModel.aboutInfo?.appName;
    this.sharedService.pageSubTitle = this.getUserInfo();
  }

  getAbout() {
    this.showLoading();
    this.appService.getAbout().subscribe({
      next: (res) => {
        this.hideLoading();
        this.appModel = res;
        this.setTitle();
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });
  }

  changeActiveLanguage() {
    let activeLanguage = this.translocoService.getActiveLang() == 'en' ? 'th' : 'en';
    this.setLanguage(activeLanguage);
    this.translocoService.setActiveLang(activeLanguage);
  }

  gotoHome() {
    if (this.sharedService.isUserAuthenticated()) {
      this.logout(false);
    }

    this.router.navigate(['']);
  }

  logout(isRedirect: boolean) {
    this.showLoading();

    let users: Users = {
      id: +this.sharedService.getUserID()!,
      username: this.sharedService.getUsername()!
    }

    this.sharedService.logout();
    this.setTitle();

    this.appService.logout(users).subscribe({
      next: (res) => {
        this.hideLoading();
      },
      error: (err) => {
        this.hideLoading();
        this.showSnackBar(this.snackBar, err);
      }
    });

    if (isRedirect) {
      this.router.navigate(['']);
    }

    this.getAbout();
  }

  toggleWorkflowSubMenu() {
    this.isShowWorkflowSubmenu = !this.isShowWorkflowSubmenu;
    this.isShowReportsSubmenu = this.isShowWorkflowSubmenu ? false : this.isShowReportsSubmenu;
    this.isShowSettingSubmenu = this.isShowWorkflowSubmenu ? false : this.isShowSettingSubmenu;
    this.isShowProjectSubmenu = this.isShowWorkflowSubmenu ? false : this.isShowProjectSubmenu;
    this.isShowJobSubmenu = this.isShowWorkflowSubmenu ? false : this.isShowJobSubmenu;
  }

  toggleReportsSubMenu() {
    this.isShowReportsSubmenu = !this.isShowReportsSubmenu;
    this.isShowWorkflowSubmenu = this.isShowReportsSubmenu ? false : this.isShowWorkflowSubmenu;
    this.isShowSettingSubmenu = this.isShowReportsSubmenu ? false : this.isShowSettingSubmenu;
    this.isShowProjectSubmenu = this.isShowReportsSubmenu ? false : this.isShowProjectSubmenu;
    this.isShowJobSubmenu = this.isShowReportsSubmenu ? false : this.isShowJobSubmenu;
  }
  toggleProjectSubMenu() {
    this.isShowProjectSubmenu = !this.isShowProjectSubmenu;
    this.isShowWorkflowSubmenu = this.isShowProjectSubmenu ? false : this.isShowWorkflowSubmenu;
    this.isShowReportsSubmenu = this.isShowProjectSubmenu ? false : this.isShowReportsSubmenu;
    this.isShowSettingSubmenu = this.isShowProjectSubmenu ? false : this.isShowSettingSubmenu;
    this.isShowJobSubmenu = this.isShowProjectSubmenu ? false : this.isShowJobSubmenu;
  }
  toggleSettingsSubMenu() {
    this.isShowSettingSubmenu = !this.isShowSettingSubmenu;
    this.isShowWorkflowSubmenu = this.isShowSettingSubmenu ? false : this.isShowWorkflowSubmenu;
    this.isShowReportsSubmenu = this.isShowSettingSubmenu ? false : this.isShowReportsSubmenu;
    this.isShowProjectSubmenu = this.isShowSettingSubmenu ? false : this.isShowProjectSubmenu;
    this.isShowJobSubmenu = this.isShowSettingSubmenu ? false : this.isShowJobSubmenu;
  }
  toggleJobSubMenu() {
    this.isShowJobSubmenu = !this.isShowJobSubmenu;
    this.isShowWorkflowSubmenu = this.isShowJobSubmenu ? false : this.isShowWorkflowSubmenu;
    this.isShowReportsSubmenu = this.isShowJobSubmenu ? false : this.isShowReportsSubmenu;
    this.isShowProjectSubmenu = this.isShowJobSubmenu ? false : this.isShowProjectSubmenu;
    this.isShowSettingSubmenu = this.isShowJobSubmenu ? false : this.isShowSettingSubmenu;
  }
}
