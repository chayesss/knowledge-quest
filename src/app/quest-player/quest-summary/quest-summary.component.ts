import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Team } from '../../shared/models/team.model';

@Component({
  selector: 'app-quest-summary',
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
  templateUrl: './quest-summary.component.html',
  styleUrl: './quest-summary.component.scss'
})
export class QuestSummaryComponent {
  @Input() teams: Team[] = []
  @Input() questName = ""
  @Output() restart = new EventEmitter<void>()

  sortedTeams: Team[] = []
  winners: Team[] = []
  highestScore = 0
  isMultipleWinners = false

  ngOnInit(): void {
    this.sortedTeams = [...this.teams].sort((a, b) => b.points! - a.points!)
    this.highestScore = this.sortedTeams[0]?.points || 0
    this.winners = this.sortedTeams.filter((team) => team.points === this.highestScore)
    this.isMultipleWinners = this.winners.length > 1
  }

  onRestart(): void {
    this.restart.emit()
  }

  isWinner(team: Team): boolean {
    return team.points === this.highestScore
  }
}
