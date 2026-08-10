import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/shared/theme.service';
import { LanguageService } from './core/services/shared/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-demo');

  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);
}
