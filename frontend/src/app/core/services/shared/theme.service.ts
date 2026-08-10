import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly isDarkMode = signal(false);

  constructor() {
    const saved = localStorage.getItem('theme');
    this.isDarkMode.set(saved === 'dark');

    effect(() => {
      const isDark = this.isDarkMode();

      document.body.classList.toggle('dark-theme', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  toggleTheme(): void {
    this.isDarkMode.update((isDark) => !isDark);
  }
}
