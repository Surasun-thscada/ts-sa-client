import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ThemeOptions } from "projects/ts-public-client-lib/src/lib/models/theme-options.model";
import { Themes } from "projects/ts-public-client-lib/src/lib/models/themes.model";
import { SharedService } from "projects/ts-public-client-lib/src/lib/services/shared.service";
import { Observable } from "rxjs";
import { StyleManagerService } from "./style-manager.service";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    constructor(
        private http: HttpClient,
        private styleManagerService: StyleManagerService,
        private sharedService: SharedService
    ) { }

    getThemeOptions(): Observable<Array<ThemeOptions>> {
        return this.http.get<Array<ThemeOptions>>("assets/themes/theme-options.json");
    }

    setTheme(themeToSet: Themes) {
        this.sharedService.isDarkTheme = themeToSet.isDarkTheme;
        this.styleManagerService.setStyle(
            'theme',
            `/assets/themes/${themeToSet.styleSheetFile}.css`
        );
    }
}
