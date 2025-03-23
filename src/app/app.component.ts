import { Component, OnInit, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button'
import { MatToolbar } from '@angular/material/toolbar'
import { MatIcon } from '@angular/material/icon'
import { AuthService } from './shared/services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule, MatToolbar, MatProgressSpinnerModule, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  user: User | undefined;
  loadingUser: boolean = false;
  currentYear = new Date().getFullYear()


  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.loadingUser = true;
    this.authService.getCurrentUser().subscribe({
      next: user => {
        this.user = user!
        this.loadingUser = false
      },
      error: e => {
        console.error(e)
      }
    })
  }

  logout() {
    this.authService.signOut();
  }

}

