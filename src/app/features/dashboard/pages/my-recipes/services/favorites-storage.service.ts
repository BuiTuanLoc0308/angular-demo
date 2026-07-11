import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesStorageService {
  private readonly storageKey = 'favoriteRecipes';
  private favorites = this.readFavorites();

  getFavorites(): string[] {
    return [...this.favorites];
  }

  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  toggleFavorite(id: string): void {
    if (this.isFavorite(id)) {
      this.favorites = this.favorites.filter((favoriteId) => favoriteId !== id);
    } else {
      this.favorites = [...this.favorites, id];
    }

    this.persistFavorites();
  }

  private readFavorites(): string[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const storedValue = localStorage.getItem(this.storageKey);

    return storedValue ? JSON.parse(storedValue) : [];
  }

  private persistFavorites(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
  }
}
