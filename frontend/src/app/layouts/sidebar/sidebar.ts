import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TokenService } from '../../core/services/auth/token.service';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatIconModule, TranslatePipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private tokenService = inject(TokenService);
  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.tokenService.removeToken();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.tokenService.removeToken();
        this.router.navigate(['/login']);
      },
    });
  }
}
