import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = false;

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  private loadTheme(): void {
    const saved = localStorage.getItem('theme');

    this.isDarkMode = saved === 'dark';

    this.applyTheme();
  }

  private applyTheme(): void {
    document.body.classList.toggle('dark-theme', this.isDarkMode);

    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }
}
