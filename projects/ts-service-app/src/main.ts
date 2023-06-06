/// <reference types="@angular/localize" />

import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeThExtra from '@angular/common/locales/extra/th';
import localeTh from '@angular/common/locales/th';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app/app-routing';
import { AppComponent } from './app/app.component';
import { provideTransloco } from './app/provide-transloco';

registerLocaleData(localeTh, 'th-TH', localeThExtra);

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(ROUTES),
    provideTransloco({ availableLangs: ['en', 'th'], defaultLang: 'en' }),
    //{ provide: 'BASE_HREF', useValue: 'https://api.tsas.iotserver.in.th/' }
    { provide: 'BASE_HREF', useValue: 'https://localhost:44347/' },
    { provide: 'BASE_API_CUSTOM', useValue: 'v1' }
  ]
});