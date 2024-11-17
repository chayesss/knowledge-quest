import { Component, OnInit, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button'
import { MatToolbar } from '@angular/material/toolbar'
import { MatIcon } from '@angular/material/icon'
import { AuthService } from './shared/services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule, MatToolbar, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  user: User | undefined;


  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe({
      next: user => {
        this.user = user!
        console.log(this.user)
      },
      error: e => {

      }
    })
  }

  logout() {
    this.authService.signOut();
  }

}

