import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['en', 'vi']);

    this.translate.setFallbackLang('en');

    const lang = localStorage.getItem('language') || 'en';

    this.translate.use(lang);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }
}
