import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { BaseComponent } from 'projects/ts-public-client-lib/src/lib/components/base.component';
import { SharedService } from 'projects/ts-public-client-lib/src/lib/services/shared.service';
import { MaterialModule } from 'projects/ts-public-client-shared/src/app/modules/material.module';
import { AboutModel } from './about.model';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule, TranslocoModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent extends BaseComponent implements OnInit {
  aboutModel: AboutModel = {
    aboutInfo: {}
  };

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public sharedService: SharedService,
    private aboutService: AboutService,
    private translocoService: TranslocoService
  ) {
    super();
    this.setActiveLanguage(this.translocoService);
    this.setTitle();
  }

  ngOnInit(): void {
    this.getAbout();
  }

  setTitle() {
    this.sharedService.pageTitle = this.translocoService.translate('title.about');
    this.sharedService.pageSubTitle = this.getUserInfo();
  }

  getAbout() {
    this.showLoading();
    this.aboutService.getAbout().subscribe({
      next: (res) => {
        this.hideLoading();
        this.aboutModel = res;
      },
      error: (err) => {
        this.hideLoading();
      }
    });
  }
}
