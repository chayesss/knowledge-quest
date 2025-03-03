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
import { quest } from '../../shared/models/quest.model';

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
  @Input() quest: quest | null = null;
  @Input() questionsEditable: boolean = true; 
  @Output() editQuestion = new EventEmitter<SubmittedQuestion>();
  @Output() addQuestionToQuest = new EventEmitter<SubmittedQuestion>();
  @Input() hideAnswers: boolean = false;  
  @Output() removeQuestionFromQuestEvent = new EventEmitter<SubmittedQuestion>();

  isQuestionInQuest(question: SubmittedQuestion): boolean {
    return this.quest?.questions?.some(q => q.questionText === question.questionText) ?? false;
  }

  toggleQuestionInQuest(question: SubmittedQuestion) {
    if (this.isQuestionInQuest(question)) {
      this.removeQuestionFromQuest(question);
    } else {
      this.addToQuest(question);
    }
  }

  handleQuestionToggle(question: SubmittedQuestion) {
    console.log('Button clicked for question:', question);
  
    if (this.isQuestionInQuest(question)) {
      console.log('Removing question:', question);
      this.removeQuestionFromQuest(question);
    } else {
      console.log('Adding question:', question);
      this.addToQuest(question);
    }
  }
  

  addToQuest(question: SubmittedQuestion) {
    this.addQuestionToQuest.emit(question);
  }

  removeQuestionFromQuest(question: SubmittedQuestion) {
    this.removeQuestionFromQuestEvent.emit(question);
  }
  
}
