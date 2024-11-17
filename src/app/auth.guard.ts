import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { catchError, map, Observable, of } from 'rxjs';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }),
      catchError(error => {
        console.error(error);
        this.router.navigate(['/login']); // Redirect on error as well
        return of(false);
      })
    );
  }
}