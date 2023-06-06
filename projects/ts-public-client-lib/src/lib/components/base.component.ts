import { Directive } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { BaseReportsViewModel } from '../models/base-reports-view.model';
import { ResultMessage } from '../models/result-message.model';

const moment = _rollupMoment || _moment;

export abstract class BaseComponent {
  public isShowLoading: boolean = false;
  public classTextGeneric: string = '';
  public classTextError: string = 'error-snackbar';
  public classTextNormal: string = 'success-snackbar';

  isMobileAndTabletBrowser = function () {
    var check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor);
    return check;
  };

  showLoading() {
    this.isShowLoading = true;
  }

  hideLoading() {
    this.isShowLoading = false;
  }

  getUserInfo() {
    let userFullname = localStorage.getItem('userFullName');
    return userFullname != null ? userFullname : 'Guest';
  }

  getUserInfoWithDateShift() {
    return localStorage.getItem('dateLogined') + ' : ' + localStorage.getItem('shiftLogined') + ' [' + localStorage.getItem('userFullName') + ']';
  }

  getUserType() {
    return localStorage.getItem('userType');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  setLanguage(language: string) {
    localStorage.setItem('language', language);
  }

  getLanguage() {
    let language = localStorage.getItem('language');
    return language == null ? 'en' : language;
  }

  getLocale() {
    let language = localStorage.getItem('locale');
    return language == null ? 'en-US' : language;
  }

  setSideMenuMode(sideMenuMode: number) {
    localStorage.setItem('sideMenuMode', sideMenuMode.toString());
  }

  getSideMenuMode() {
    let sideMenuMode = localStorage.getItem('sideMenuMode');
    return sideMenuMode == null ? 'side' : +sideMenuMode == 0 ? 'side' : 'over';
  }

  getSideMenuModeRaw() {
    let sideMenuMode = localStorage.getItem('sideMenuMode');
    return sideMenuMode == null ? 0 : +sideMenuMode;
  }

  setActiveLanguage(translocoService: TranslocoService) {
    translocoService.setActiveLang(this.getLanguage());
  }

  compareSelectObject(o1: any, o2: any) {
    if (o1.id == o2.id) {
      return true;
    } else {
      return false;
    }
  }

  compareSelectKeyObject(o1: any, o2: any) {
    if (o1.key == o2.key) {
      return true;
    } else {
      return false;
    }
  }

  compareSelectUserObject(o1: any, o2: any) {
    if (o1.userID == o2.userID) {
      return true;
    } else {
      return false;
    }
  }

  compareSelectStringAndNumber(s1: string, n2: number) {
    if (s1 == n2.toString()) {
      return true;
    } else {
      return false;
    }
  }

  showSnackBar(snackBar: MatSnackBar, resultMessage: ResultMessage) {
    snackBar.open(resultMessage.error?.message != null ? resultMessage.error.message! : resultMessage.message!, null!, {
      duration: 2000,
      panelClass: resultMessage.status == 1 ? this.classTextNormal : this.classTextError,
    });
  }

  isNumber(o: any): boolean {
    return !isNaN(o - 0) && o !== null && o !== '' && o !== false;
  }

  getModeName(mode: number, translocoService: TranslocoService) {
    switch (mode) {
      case 1:
      case 2:
        return translocoService.translate('edit');
      case 3:
      case 4:
      default:
        return translocoService.translate('new');
    }
  }

  chosenMonthHandler(reportsViewModel: BaseReportsViewModel, normalizedMonth: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>) {
    reportsViewModel.dateTimeFrom = normalizedMonth.toDate();
    datepicker.close();
  }

  chosenYearHandler(reportsViewModel: BaseReportsViewModel, normalizedYear: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>) {
    reportsViewModel.dateTimeFrom = normalizedYear.toDate();
    datepicker.close();
  }

  checkboxToggleGeneric(item: number, list: number[]) {
    let idx = list.indexOf(item);

    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
  }

  checkboxIsCheckedGeneric(listItemsSelected: number[], listItemsAvalilable: number[]) {
    if (listItemsSelected != undefined && listItemsAvalilable != undefined) {
      return listItemsSelected.length === listItemsAvalilable.length;
    } else {
      return false;
    }
  }

  checkboxExistsGeneric(item: number, listItems: number[]) {
    return listItems.indexOf(item) > -1;
  }

  checkboxIsIndeterminateGeneric(listItemsSelected: number[], listItemsAvalilable: number[]) {
    if (listItemsSelected != undefined && listItemsAvalilable != undefined) {
      return (listItemsSelected.length !== 0 && listItemsSelected.length !== listItemsAvalilable.length);
    } else {
      return false;
    }
  }

  checkboxToggleAllGeneric(listItemsSelected: number[], listItemsAvalilable: number[]) {
    if (listItemsSelected != undefined && listItemsAvalilable != undefined) {
      if (listItemsSelected.length === listItemsAvalilable.length) {
        return [];
      } else if (listItemsSelected.length === 0 || listItemsSelected.length > 0) {
        return listItemsAvalilable.slice(0);
      }
    }

    return [];
  }
}

export const TS_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const TS_DATE_FORMATS_MONTH = {
  parse: {
    dateInput: 'MMMM YYYY',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'MMMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const TS_DATE_FORMATS_YEAR = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Directive({
  selector: '[dateFormatMonth]',
  standalone: true,
  providers: [{ provide: MAT_DATE_FORMATS, useValue: TS_DATE_FORMATS_MONTH }],
})
export class DateFormatMonthDirective { }

@Directive({
  selector: '[dateFormatYear]',
  standalone: true,
  providers: [{ provide: MAT_DATE_FORMATS, useValue: TS_DATE_FORMATS_YEAR }],
})
export class DateFormatYearDirective { }
