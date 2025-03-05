import { Component, Input, OnInit } from '@angular/core';
import { CompletedQuest, Quest } from '../shared/models/quest.model';
import { Team } from '../shared/models/team.model';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { TeamScoreboardComponent } from "./team-scoreboard/team-scoreboard.component";
import { QuestionDisplayComponent } from "./question-display/question-display.component";
import { ActivatedRoute } from '@angular/router';
import { QuestService } from '../shared/services/quest.service';
import { CommonModule } from '@angular/common';
import { QuestSummaryComponent } from "./quest-summary/quest-summary.component";

@Component({
  selector: 'app-quest-player',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatCardModule,
    MatListModule,
    TeamScoreboardComponent,
    QuestionDisplayComponent,
    QuestSummaryComponent
],
  templateUrl: './quest-player.component.html',
  styleUrl: './quest-player.component.scss'
})
export class QuestPlayerComponent implements OnInit {

  quest!: Quest
  completedQuest!: CompletedQuest
  currentQuestionIndex = 0
  isAnswerRevealed = false
  teams: Team[] = []
  gameStarted = false
  gameCompleted = false

  constructor(route: ActivatedRoute, private questService: QuestService) {
    route.params.subscribe(params => {
      this.questService.getCompletedQuestById(params['id']).subscribe(quest => {
        console.log(quest)
        this.completedQuest = quest;
        this.teams = quest.teams;
        this.questService.getQuestById(this.completedQuest.questId).subscribe(quest => {
          this.quest = quest;
        });
      });
    });
  }

  get currentQuestion() {
    return this.quest.questions[this.currentQuestionIndex]
  }

  get isLastQuestion() {
    return this.currentQuestionIndex === this.quest.questions.length - 1
  }

  get progress() {
    return ((this.currentQuestionIndex + 1) / this.quest.questions.length) * 100
  }

  ngOnInit(): void {
  }

  startGame(): void {
    this.gameStarted = true
  }

  revealAnswer(): void {
    this.isAnswerRevealed = true
  }

  awardPointsToTeam(teamIndex: number, points = 1): void {
    this.teams[teamIndex].points! += points
  }

  nextQuestion(): void {
    if (this.isLastQuestion) {
      this.gameCompleted = true
    } else {
      this.currentQuestionIndex++
      this.isAnswerRevealed = false
    }
  }

  restartGame(): void {
    this.currentQuestionIndex = 0
    this.isAnswerRevealed = false
    this.teams = this.teams.map((team) => ({ ...team, points: 0 }))
    this.gameCompleted = false
    this.gameStarted = false
  }

}
