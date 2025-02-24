import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from 'firebase/auth';
import { SubmittedQuestion } from '../../shared/models/question.model';
import { Quest } from '../../shared/models/quest.model';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatIcon,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent {
  @Input() user!: User | null;
  @Input() questions: SubmittedQuestion[] = [];
  @Input() quest: Quest | null = null;
  @Input() questionsEditable: boolean = true;
  @Output() editQuestion = new EventEmitter<SubmittedQuestion>();
  @Output() addQuestionToQuest = new EventEmitter<SubmittedQuestion>();
  @Input() hideAnswers: boolean = false;  // New input to control hiding answers


  openEditDialog(question: SubmittedQuestion) {
    this.editQuestion.emit(question);
  }

  addToQuest(question: SubmittedQuestion) {
    this.addQuestionToQuest.emit(question);
  }
}
