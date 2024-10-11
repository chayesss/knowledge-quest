import { Component, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button'
import { MatToolbar } from '@angular/material/toolbar'
import { MatIcon } from '@angular/material/icon'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatSlideToggleModule, MatButtonModule, MatToolbar, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {



}

