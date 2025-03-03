import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer, SubmittedQuestion } from '../../shared/models/question.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-display',
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
  templateUrl: './question-display.component.html',
  styleUrl: './question-display.component.scss'
})
export class QuestionDisplayComponent {
  @Input() question!: SubmittedQuestion
  @Input() isAnswerRevealed = false
  @Output() revealAnswer = new EventEmitter<void>()

  onRevealAnswer(): void {
    this.revealAnswer.emit()
  }

  isCorrectOption(option: Answer): boolean {
    return option.isCorrect;
  }
}
