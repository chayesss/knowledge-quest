import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Team } from '../../shared/models/team.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-scoreboard',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatCardModule,
    MatListModule],
  templateUrl: './team-scoreboard.component.html',
  styleUrl: './team-scoreboard.component.scss'
})
export class TeamScoreboardComponent {
  @Input() teams: Team[] = []
  @Output() awardPoints = new EventEmitter<{ teamIndex: number; points: number }>()

  onAwardPoints(teamIndex: number, points: number): void {
    this.awardPoints.emit({ teamIndex, points })
  }
}
