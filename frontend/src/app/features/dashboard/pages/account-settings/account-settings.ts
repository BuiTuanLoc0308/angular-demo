import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';
import { LanguageService } from '../../../../core/services/language.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.html',
  imports: [TranslatePipe],
  standalone: true,
  styleUrl: './account-settings.scss',
})
export class AccountSettings {
  public theme = inject(ThemeService);
  public languageService = inject(LanguageService);

  selectedLanguage = localStorage.getItem('language') || 'en';

  changeLanguage(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.languageService.changeLanguage(lang);
  }
}
